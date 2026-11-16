"use client";
import { motion } from "framer-motion";
import type { Condition } from "@/lib/weatherMap";
const K="#2b2833";
export default function PandaAnimation({c}:{c:Condition}){
  const wet=c==="rain"||c==="storm", cold=c==="snow"||c==="cold", scarf=cold||c==="fog"||c==="windy";
  const sleepy=c==="cloudy"||c==="clear", scared=c==="storm";
  const mv:any = cold||scared ? {animate:{x:[-2.5,2.5,-2.5]},transition:{repeat:Infinity,duration:.25}}
    : c==="windy" ? {animate:{rotate:[-2,-8,-2]},transition:{repeat:Infinity,duration:1.4,ease:"easeInOut"},style:{transformOrigin:"50% 100%",transformBox:"fill-box"}}
    : {animate:{y:[0,-5,0]},transition:{repeat:Infinity,duration:3,ease:"easeInOut"}};
  const eye=(x:number,f:number)=> sleepy
    ? <path d={`M${x-7} 100 Q${x} 107 ${x+7} 100`} stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round"/>
    : <g className="blink"><circle cx={x} cy={98} r={scared?8:6} fill="#fff"/><circle cx={x+f} cy={98} r={scared?3:3.6} fill={K}/><circle cx={x+f+1.5} cy={96} r="1.3" fill="#fff"/></g>;
  const mouth = scared||c==="fog" ? <ellipse cx="120" cy="127" rx="5" ry={scared?7:4} fill="#ff8aa0"/>
    : cold ? <path d="M110 127 q4 -4 7 0 t7 0 t6 0" stroke={K} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    : <path d="M110 123 Q120 134 130 123" stroke={K} strokeWidth="3" fill="none" strokeLinecap="round"/>;
  const armFill = cold ? "#ff9bb5" : K;
  return (
    <svg viewBox="-10 -80 280 380" className="w-full max-w-sm drop-shadow-xl" role="img" aria-label={`Panda dressed for ${c} weather`}>
      {c==="snow"||c==="cold" ? <ellipse cx="120" cy="262" rx="125" ry="20" fill="#fff"/> : null}
      {wet && <>{[0,1].map(i=><motion.ellipse key={i} cx={i?170:70} cy="266" rx="26" ry="6" fill="#9ccaf0" opacity=".7" animate={{rx:[20,30,20]}} transition={{repeat:Infinity,duration:2+i}}/>)}</>}
      <motion.g {...mv}>
        <ellipse cx="88" cy="247" rx="22" ry="15" fill={K}/><ellipse cx="152" cy="247" rx="22" ry="15" fill={K}/>
        {wet && <><rect x="66" y="238" width="44" height="26" rx="10" fill="#ffd84d"/><rect x="130" y="238" width="44" height="26" rx="10" fill="#ffd84d"/></>}
        <ellipse cx="120" cy="190" rx="58" ry="60" fill="#fff"/>
        {wet && <><path d="M62 190 Q60 150 120 146 Q180 150 178 190 L182 236 Q120 252 58 236Z" fill="#ffd84d"/>{[176,196,216].map(y=><circle key={y} cx="120" cy={y} r="4" fill="#f0a500"/>)}</>}
        {cold && <path d="M62 190 Q60 150 120 146 Q180 150 178 190 L182 236 Q120 252 58 236Z" fill="#7ec8ff"/>}
        {scarf && <><rect x="70" y="144" width="100" height="18" rx="9" fill="#ff6b8a"/><motion.path d="M150 158 l22 40 l-16 4 l-14 -34z" fill="#ff6b8a" animate={c==="windy"?{rotate:[0,30,0],x:[0,14,0]}:{}} transition={{repeat:Infinity,duration:.9}} style={{transformOrigin:"150px 158px"}}/></>}
        <ellipse cx="64" cy="190" rx="13" ry="27" transform="rotate(18 64 190)" fill={armFill}/>
        <ellipse cx="176" cy="188" rx="13" ry="27" transform="rotate(-18 176 188)" fill={armFill}/>
        <circle cx="72" cy="58" r="19" fill={K}/><circle cx="168" cy="58" r="19" fill={K}/>
        <ellipse cx="120" cy="100" rx="62" ry="54" fill="#fff"/>
        <ellipse cx="92" cy="100" rx="15" ry="19" transform="rotate(-20 92 100)" fill={K}/>
        <ellipse cx="148" cy="100" rx="15" ry="19" transform="rotate(20 148 100)" fill={K}/>
        {eye(93,-1)}{eye(147,1)}
        {c==="fog" && <><path d="M80 78 l20 -6" stroke={K} strokeWidth="3" strokeLinecap="round"/><path d="M140 72 l20 6" stroke={K} strokeWidth="3" strokeLinecap="round"/></>}
        <ellipse cx="120" cy="116" rx="6.5" ry="4.5" fill={K}/>{mouth}
        <ellipse cx="70" cy="118" rx="9" ry="6" fill="#ff9bb5" opacity=".6"/><ellipse cx="170" cy="118" rx="9" ry="6" fill="#ff9bb5" opacity=".6"/>
        {cold && <><path d="M62 70 Q120 -10 178 70Z" fill="#ff9bb5"/><rect x="60" y="62" width="120" height="14" rx="7" fill="#ff6b8a"/><circle cx="120" cy="2" r="11" fill="#fff"/></>}
        {c==="sunny" && <><g><rect x="70" y="88" width="38" height="22" rx="9" fill={K}/><rect x="132" y="88" width="38" height="22" rx="9" fill={K}/><path d="M108 96 h24" stroke={K} strokeWidth="3"/><path d="M76 92 l10 0" stroke="#fff" strokeWidth="2" opacity=".6"/></g>
          <g><rect x="180" y="150" width="22" height="34" rx="5" fill="#ff9bb5"/><path d="M191 150 l8 -22" stroke="#fff" strokeWidth="3"/><circle cx="202" cy="154" r="8" fill="#ffe66d"/></g></>}
        {c==="cold" && <g><rect x="178" y="166" width="24" height="28" rx="5" fill="#8b5a3c"/><path d="M202 172 q12 4 0 16" stroke="#8b5a3c" strokeWidth="4" fill="none"/>
          <motion.path d="M185 160 q-5 -8 0 -14 q5 -6 0 -12" stroke="#fff" strokeWidth="2.5" fill="none" animate={{opacity:[.9,0],y:[0,-8]}} transition={{repeat:Infinity,duration:1.8}}/></g>}
        {c==="cold" && [0,1,2].map(i=><motion.circle key={i} cx="132" cy="130" r="3" fill="#fff" animate={{x:[0,20],y:[0,-6],opacity:[.9,0],r:[3,8]}} transition={{repeat:Infinity,duration:2,delay:i*.6}}/>)}
        {c==="cloudy"&&<motion.text x="176" y="40" fontSize="22" fill="#fff" animate={{y:[40,10],opacity:[1,0]}} transition={{repeat:Infinity,duration:2.5}}>z</motion.text>}
        {wet && <g><line x1="172" y1="190" x2="140" y2="8" stroke={K} strokeWidth="4" strokeLinecap="round"/>
          <path d="M60 14 Q140 -66 220 14 Q200 4 180 14 Q160 4 140 14 Q120 4 100 14 Q80 4 60 14Z" fill="#ff8fb8"/>
          <path d="M100 14 Q140 -66 180 14 Q160 4 140 14 Q120 4 100 14Z" fill="#8fd3ff"/></g>}
      </motion.g>
    </svg>);
}
