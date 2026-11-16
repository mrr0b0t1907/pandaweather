"use client";
import { RefreshCw } from "lucide-react";
import PandaMascot from "./PandaMascot";
import WeatherDetails from "./WeatherDetails";
import WeatherForecast from "./WeatherForecast";
import { toF, type Condition, type WeatherData } from "@/lib/weatherMap";
export default function WeatherDashboard({d,unit,condition,onRefresh,busy}:{d:WeatherData;unit:"C"|"F";condition:Condition;onRefresh:()=>void;busy:boolean}){
  const c=d.current, temp=unit==="F"?toF(c.temperature):c.temperature;
  const time=new Date(d.location.localtime.replace(" ","T")+"Z").toLocaleString(undefined,{timeZone:"UTC",weekday:"long",hour:"numeric",minute:"2-digit",month:"short",day:"numeric"});
  return <main className="max-w-6xl mx-auto px-4 pb-12 space-y-5">
    <section className="grid md:grid-cols-2 gap-6 items-center py-6">
      <div className="text-center md:text-left">
        <h1 className="font-display text-3xl font-semibold">{d.location.name}, <span className="opacity-70">{d.location.country}</span></h1>
        <p className="opacity-80">{time}</p>
        <div className="font-display font-semibold leading-none text-8xl md:text-9xl my-3">{temp}°<span className="text-4xl align-top">{unit}</span></div>
        <p className="text-xl font-bold">{c.weather_descriptions.join(", ")}</p>
        <button onClick={onRefresh} disabled={busy} className="glass rounded-full px-4 py-2 mt-4 inline-flex items-center gap-2 font-bold hover:scale-105 transition"><RefreshCw size={16} className={busy?"animate-spin":""}/>Refresh</button>
      </div>
      <PandaMascot condition={condition}/>
    </section>
    <WeatherDetails d={d} unit={unit}/><WeatherForecast f={d.forecast} unit={unit}/>
  </main>;
}
