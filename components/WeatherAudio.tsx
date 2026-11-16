"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import type { Audio } from "@/lib/weatherMap";
// All sounds are synthesized with the Web Audio API: original, royalty-free, no asset files, never autoplays.
type Scene={out:GainNode;stop:()=>void};
const noise=(ctx:AudioContext)=>{const b=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const s=ctx.createBufferSource();s.buffer=b;s.loop=true;return s;};
function build(ctx:AudioContext,kind:Audio,lv:number,heavy:boolean):Scene{
  const out=ctx.createGain(); out.gain.value=0;
  const srcs:AudioScheduledSourceNode[]=[], timers:any[]=[]; let onLight:(()=>void)|null=null;
  const layer=(type:BiquadFilterType,f:number,g:number,lfo=0)=>{
    const n=noise(ctx),fl=ctx.createBiquadFilter(),gn=ctx.createGain(); fl.type=type; fl.frequency.value=f; gn.gain.value=g;
    n.connect(fl).connect(gn).connect(out); n.start(); srcs.push(n);
    if(lfo){const o=ctx.createOscillator(),og=ctx.createGain(); o.frequency.value=lfo; og.gain.value=g*.7; o.connect(og).connect(gn.gain); o.start(); srcs.push(o);}
  };
  const boom=()=>{const n=noise(ctx),fl=ctx.createBiquadFilter(),g=ctx.createGain(),t=ctx.currentTime;fl.type="lowpass";fl.frequency.value=140;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(2.2*lv,t+.15);g.gain.exponentialRampToValueAtTime(.001,t+3.5);n.connect(fl).connect(g).connect(out);n.start(t);n.stop(t+3.6);};
  const chirp=()=>{const o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime,f=2200+Math.random()*1800;o.frequency.setValueAtTime(f,t);o.frequency.exponentialRampToValueAtTime(f*1.4,t+.12);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.12*lv,t+.03);g.gain.linearRampToValueAtTime(0,t+.18);o.connect(g).connect(out);o.start(t);o.stop(t+.2);};
  const k=heavy?1.6:1;
  if(kind==="rain"||kind==="storm"){layer("highpass",1400,.35*lv*k);layer("bandpass",700,.3*lv*k);}
  if(kind==="storm"){onLight=()=>timers.push(setTimeout(boom,400+Math.random()*1600)); window.addEventListener("panda-lightning",onLight);}
  if(kind==="snowwind"){layer("lowpass",500,.25*lv,.15);}
  if(kind==="wind"){layer("bandpass",450,.45*lv,.25);}
  if(kind==="calm"){layer("lowpass",260,.12*lv,.05);}
  if(kind==="birds"){layer("lowpass",300,.05*lv); const loop=()=>{chirp();if(Math.random()>.5)timers.push(setTimeout(chirp,160));timers.push(setTimeout(loop,1200+Math.random()*3000));}; loop();}
  return {out,stop:()=>{timers.forEach(clearTimeout); if(onLight)window.removeEventListener("panda-lightning",onLight); srcs.forEach(s=>{try{s.stop()}catch{}}); out.disconnect();}};
}
export default function WeatherAudio({kind,heavy}:{kind:Audio;heavy:boolean}){
  const [on,setOn]=useState(false),[vol,setVol]=useState(.5),[lv,setLv]=useState(1);
  const r=useRef<{ctx:AudioContext;master:GainNode;cur?:Scene}|null>(null);
  useEffect(()=>{try{const p=JSON.parse(sessionStorage.getItem("pw_audio")||"{}");if(p.vol!=null)setVol(p.vol);if(p.lv!=null)setLv(p.lv);}catch{}},[]);
  useEffect(()=>{try{sessionStorage.setItem("pw_audio",JSON.stringify({vol,lv}));}catch{} if(r.current)r.current.master.gain.value=vol;},[vol,lv]);
  useEffect(()=>{
    const fadeOut=(s?:Scene,ctx?:AudioContext)=>{if(!s||!ctx)return;s.out.gain.cancelScheduledValues(ctx.currentTime);s.out.gain.setValueAtTime(s.out.gain.value,ctx.currentTime);s.out.gain.linearRampToValueAtTime(0,ctx.currentTime+1.2);setTimeout(s.stop,1400);};
    if(!on){ if(r.current){fadeOut(r.current.cur,r.current.ctx);r.current.cur=undefined;} return; }
    if(!r.current){const ctx=new (window.AudioContext||(window as any).webkitAudioContext)();const master=ctx.createGain();master.gain.value=vol;master.connect(ctx.destination);r.current={ctx,master};}
    const {ctx,master}=r.current; ctx.resume();
    fadeOut(r.current.cur,ctx); // only one weather scene ever plays: old one fades while the new one fades in
    const s=build(ctx,kind,lv,heavy); s.out.connect(master); s.out.gain.linearRampToValueAtTime(1,ctx.currentTime+1.5); r.current.cur=s;
  },[on,kind,heavy,lv]); // eslint-disable-line
  return <div className="flex items-center gap-2">
    <button onClick={()=>setOn(!on)} aria-pressed={on} aria-label={on?"Turn sound off":"Turn sound on"} className="glass rounded-full p-2.5 hover:scale-105 transition">{on?<Volume2 size={18}/>:<VolumeX size={18}/>}</button>
    {on && <><input aria-label="Volume" type="range" min="0" max="1" step=".05" value={vol} onChange={e=>setVol(+e.target.value)} className="w-20 accent-pink-400"/>
      <select aria-label="Sound intensity" value={lv} onChange={e=>setLv(+e.target.value)} className="glass rounded-full px-2 py-1 text-sm bg-transparent"><option value={.5}>Soft</option><option value={1}>Normal</option><option value={1.6}>Strong</option></select></>}
  </div>;
}
