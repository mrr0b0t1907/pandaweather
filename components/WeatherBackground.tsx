"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { THEME, type Condition } from "@/lib/weatherMap";
export default function WeatherBackground({condition}:{condition:Condition}){
  const [flash,setFlash]=useState(false);
  useEffect(()=>{
    if(condition!=="storm") return;
    let to:any; const go=()=>{ to=setTimeout(()=>{ setFlash(true); window.dispatchEvent(new Event("panda-lightning")); setTimeout(()=>setFlash(false),300); go(); },3500+Math.random()*6000); };
    go(); return ()=>clearTimeout(to);
  },[condition]);
  const n = condition==="storm"?90: condition==="rain"?60: condition==="snow"||condition==="cold"?70: condition==="windy"?14: condition==="sunny"?18:0;
  const ps = useMemo(()=>Array.from({length:n},()=>({l:Math.random()*100,t:Math.random()*100,d:Math.random()*4,s:Math.random()})),[n,condition]);
  const [a,b]=THEME[condition].sky;
  const clouds = ["cloudy","sunny","rain","storm","windy","clear"].includes(condition);
  return <div className="fixed inset-0 -z-10 overflow-hidden">
    <AnimatePresence><motion.div key={condition} className="absolute inset-0" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1.4}} style={{background:`linear-gradient(180deg,${a},${b})`}}/></AnimatePresence>
    {condition==="sunny" && <div className="p rounded-full" style={{top:"6%",right:"10%",width:120,height:120,background:"radial-gradient(#fff6c2,#ffd54f)",boxShadow:"0 0 80px 30px rgba(255,220,100,.6)"}}/>}
    {clouds && [0,1,2,3].map(i=><div key={i} className="p cloud" style={{top:`${6+i*12}%`,width:180+i*50,height:50+i*10,opacity:condition==="storm"?.35:.8,animationDuration:`${60+i*25}s`,animationDelay:`-${i*20}s`,background:condition==="storm"||condition==="rain"?"rgba(70,80,110,.7)":undefined}}/>)}
    {condition==="fog" && [0,1,2].map(i=><div key={i} className="p fog" style={{top:`${20+i*25}%`,animationDuration:`${9+i*3}s`}}/>)}
    {(condition==="rain"||condition==="storm") && ps.map((p,i)=><div key={i} className="p drop" style={{left:`${p.l}%`,animationDuration:`${(condition==="storm"?.45:.7)+p.s*.3}s`,animationDelay:`-${p.d}s`}}/>)}
    {(condition==="snow"||condition==="cold") && ps.map((p,i)=><div key={i} className="p flake" style={{left:`${p.l}%`,width:3+p.s*6,height:3+p.s*6,animationDuration:`${5+p.s*6}s`,animationDelay:`-${p.d*2}s`}}/>)}
    {condition==="windy" && ps.map((p,i)=><div key={i} className="p leaf" style={{top:`${p.t}%`,animationDuration:`${3+p.s*3}s`,animationDelay:`-${p.d}s`}}/>)}
    {condition==="sunny" && ps.map((p,i)=><div key={i} className="p spark" style={{left:`${p.l}%`,top:`${p.t}%`,animationDelay:`${p.d}s`,fontSize:10+p.s*12}}>✨</div>)}
    <AnimatePresence>{flash && <motion.div className="p inset-0 bg-white" style={{position:"fixed",inset:0}} initial={{opacity:.9}} animate={{opacity:0}} exit={{opacity:0}} transition={{duration:.3}}/>}</AnimatePresence>
  </div>;
}
