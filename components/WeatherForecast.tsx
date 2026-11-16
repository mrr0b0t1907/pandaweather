"use client";
import { toF, type Day } from "@/lib/weatherMap";
export default function WeatherForecast({f,unit}:{f:Record<string,Day>|null;unit:"C"|"F"}){
  if(!f) return <section className="glass rounded-3xl p-5 text-center text-sm">🐼 The 5-day forecast needs a paid Weatherstack plan. Current weather works on the free plan.</section>;
  const days=Object.entries(f), cv=(v:number)=>unit==="F"?toF(v):v;
  const hi=days.map(([,d])=>cv(d.maxtemp)), lo=days.map(([,d])=>cv(d.mintemp));
  const mx=Math.max(...hi), mn=Math.min(...lo), r=Math.max(mx-mn,1), W=100/days.length;
  const y=(v:number)=>10+(1-(v-mn)/r)*70, pts=(a:number[])=>a.map((v,i)=>`${W*i+W/2},${y(v)}`).join(" ");
  return <section className="glass rounded-3xl p-5" aria-label="Forecast">
    <h2 className="font-display text-lg font-semibold mb-2">Next {days.length} days</h2>
    <svg viewBox="0 0 100 90" className="w-full h-40" preserveAspectRatio="none">
      <polyline points={pts(hi)} fill="none" stroke="#ff7aa2" strokeWidth="1.2" vectorEffect="non-scaling-stroke"/>
      <polyline points={pts(lo)} fill="none" stroke="#6fb4ff" strokeWidth="1.2" vectorEffect="non-scaling-stroke"/></svg>
    <div className="flex">{days.map(([date,d],i)=><div key={date} className="flex-1 text-center text-sm"><div className="font-bold">{new Date(date+"T12:00:00").toLocaleDateString(undefined,{weekday:"short"})}</div>
      <div className="text-pink-600">{hi[i]}°</div><div className="text-sky-700">{lo[i]}°</div></div>)}</div></section>;
}
