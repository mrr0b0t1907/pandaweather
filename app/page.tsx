"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import WeatherBackground from "@/components/WeatherBackground";
import WeatherDashboard from "@/components/WeatherDashboard";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorMessage from "@/components/ErrorMessage";
import { getCondition, THEME, type WeatherData } from "@/lib/weatherMap";
export default function Home(){
  const [data,setData]=useState<WeatherData|null>(null),[err,setErr]=useState(""),[busy,setBusy]=useState(true),[unit,setUnit]=useState<"C"|"F">("C");
  const last=useRef("London");
  const load=useCallback(async(q:string)=>{
    last.current=q; setBusy(true); setErr("");
    try{ const r=await fetch(`/api/weather?q=${encodeURIComponent(q)}`); const j=await r.json(); if(!r.ok) throw new Error(j.error||"Something went wrong."); setData(j); }
    catch(e:any){ setErr(e.message||"Network error. Check your connection."); }
    finally{ setBusy(false); }
  },[]);
  useEffect(()=>{ load(last.current); const t=setInterval(()=>load(last.current),10*60_000); return()=>clearInterval(t); },[load]); // auto refresh
  const locate=()=>{
    if(!navigator.geolocation) return setErr("Your browser doesn't support location.");
    navigator.geolocation.getCurrentPosition(p=>load(`${p.coords.latitude},${p.coords.longitude}`),()=>setErr("Location permission was denied. Search for a city instead."));
  };
  const condition = data?getCondition(data.current):"cloudy";
  return <>
    <WeatherBackground condition={condition}/>
    <Navbar onSearch={load} onLocate={locate} unit={unit} setUnit={setUnit} kind={THEME[condition].audio} heavy={(data?.current.precip??0)>=4}/>
    {err && <ErrorMessage message={err} onRetry={()=>load(last.current)}/>}
    {!data && busy ? <LoadingScreen/> : data && <WeatherDashboard d={data} unit={unit} condition={condition} onRefresh={()=>load(last.current)} busy={busy}/>}
  </>;
}
