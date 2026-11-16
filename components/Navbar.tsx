"use client";
import { LocateFixed } from "lucide-react";
import WeatherSearch from "./WeatherSearch";
import WeatherAudio from "./WeatherAudio";
import TemperatureToggle from "./TemperatureToggle";
import type { Audio } from "@/lib/weatherMap";
export default function Navbar(p:{onSearch:(q:string)=>void;onLocate:()=>void;unit:"C"|"F";setUnit:(u:"C"|"F")=>void;kind:Audio;heavy:boolean}){
  return <nav className="flex flex-wrap items-center gap-3 px-4 py-3 max-w-6xl mx-auto">
    <div className="font-display text-2xl font-semibold mr-auto sm:mr-2">🐼 PandaWeather</div>
    <div className="order-last sm:order-none w-full sm:w-auto sm:flex-1 flex gap-2 items-center"><WeatherSearch onSearch={p.onSearch}/>
      <button onClick={p.onLocate} aria-label="Use my location" className="glass rounded-full p-2.5 hover:scale-105 transition"><LocateFixed size={18}/></button></div>
    <WeatherAudio kind={p.kind} heavy={p.heavy}/><TemperatureToggle unit={p.unit} setUnit={p.setUnit}/>
  </nav>;
}
