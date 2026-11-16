"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
export default function WeatherSearch({onSearch}:{onSearch:(q:string)=>void}){
  const [q,setQ]=useState(""),[sug,setSug]=useState<any[]>([]);
  useEffect(()=>{ if(q.trim().length<2){setSug([]);return;} const t=setTimeout(async()=>{try{setSug(await (await fetch(`/api/search?q=${encodeURIComponent(q)}`)).json());}catch{setSug([]);}},350); return()=>clearTimeout(t); },[q]);
  const go=(v:string)=>{ if(v.trim()){onSearch(v.trim());setQ("");setSug([]);} };
  return <div className="relative flex-1 max-w-md">
    <form onSubmit={e=>{e.preventDefault();go(q);}} className="glass rounded-full flex items-center px-4 gap-2">
      <Search size={16}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search a city…" aria-label="Search a city" className="bg-transparent outline-none py-2.5 w-full placeholder:text-slate-600/70"/></form>
    {sug.length>0 && <ul className="absolute top-12 inset-x-0 glass rounded-2xl overflow-hidden z-20 bg-white/70">
      {sug.map((s,i)=><li key={i}><button onClick={()=>go(`${s.name}, ${s.country}`)} className="w-full text-left px-4 py-2 hover:bg-white/60">{s.name}, <span className="opacity-70">{s.region?`${s.region}, `:""}{s.country}</span></button></li>)}</ul>}
  </div>;
}
