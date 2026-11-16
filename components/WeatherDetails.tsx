"use client";
import { Droplets, Eye, Gauge, Sun, Sunrise, Sunset, Thermometer, Wind } from "lucide-react";
import { toF, type WeatherData } from "@/lib/weatherMap";
export default function WeatherDetails({d,unit}:{d:WeatherData;unit:"C"|"F"}){
  const c=d.current, imp=unit==="F", t=(v:number)=>`${imp?toF(v):v}°`;
  const astro=(c as any).astro??(d.forecast?Object.values(d.forecast)[0]?.astro:undefined);
  const items=[
    [Thermometer,"Feels like",t(c.feelslike)],[Droplets,"Humidity",`${c.humidity}%`],
    [Wind,"Wind",`${imp?Math.round(c.wind_speed*.621):c.wind_speed} ${imp?"mph":"km/h"} ${c.wind_dir}`],
    [Sun,"UV index",`${c.uv_index}`],[Eye,"Visibility",`${imp?Math.round(c.visibility*.621):c.visibility} ${imp?"mi":"km"}`],
    [Gauge,"Pressure",`${c.pressure} mb`],[Sunrise,"Sunrise",astro?.sunrise??"Paid plan"],[Sunset,"Sunset",astro?.sunset??"Paid plan"]] as const;
  return <section className="grid grid-cols-2 md:grid-cols-4 gap-3" aria-label="Weather details">
    {items.map(([I,l,v])=><div key={l} className="glass rounded-3xl p-4"><I size={20} className="opacity-70"/><div className="text-sm opacity-75 mt-2">{l}</div><div className="font-display text-xl font-semibold">{v}</div></div>)}</section>;
}
