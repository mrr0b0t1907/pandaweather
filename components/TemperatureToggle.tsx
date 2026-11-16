"use client";
export default function TemperatureToggle({unit,setUnit}:{unit:"C"|"F";setUnit:(u:"C"|"F")=>void}){
  return <div className="glass rounded-full p-1 flex text-sm font-bold" role="group" aria-label="Temperature unit">
    {(["C","F"] as const).map(u=><button key={u} onClick={()=>setUnit(u)} aria-pressed={unit===u} className={`px-3 py-1 rounded-full transition ${unit===u?"bg-white/80 shadow":""}`}>°{u}</button>)}</div>;
}
