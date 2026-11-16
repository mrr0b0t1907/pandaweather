import { NextRequest, NextResponse } from "next/server";
// Weatherstack's free plan is HTTP-only. The call happens server-side, so the key never reaches the browser.
const BASE = "https://api.apilayer.net/weatherstack";
const cache = new Map<string,{t:number;d:unknown}>();
const MSG:Record<number,string> = {101:"The server's Weatherstack API key is invalid.",104:"Monthly API request limit reached. Try again later.",105:"This feature isn't available on the current Weatherstack plan.",601:"Please enter a city.",615:"We couldn't find that location. Check the spelling and try again."};
async function ws(path:string, params:Record<string,string>){
  const key = process.env.WEATHERSTACK_API_KEY;
  if(!key) throw new Error("Server is missing WEATHERSTACK_API_KEY (see .env.example).");
  const u = new URL(BASE+path); u.searchParams.set("access_key",key);
  for(const [k,v] of Object.entries(params)) u.searchParams.set(k,v);
  return (await fetch(u,{cache:"no-store"})).json();
}
export async function GET(req:NextRequest){
  const q = req.nextUrl.searchParams.get("q")?.trim().slice(0,80);
  if(!q) return NextResponse.json({error:MSG[601]},{status:400});
  const hit = cache.get(q.toLowerCase());
  if(hit && Date.now()-hit.t < 5*60_000) return NextResponse.json(hit.d); // respect plan limits
  try{
    const cur = await ws("/current",{query:q});
    if(cur.error) return NextResponse.json({error:MSG[cur.error.code]??"Weather service error."},{status:cur.error.code===615?404:502});
    let forecast = null;
    const f = await ws("/forecast",{query:q,forecast_days:"5",hourly:"0"}).catch(()=>null);
    if(f && !f.error && f.forecast) forecast = f.forecast; // paid plans only
    const d = {location:cur.location,current:cur.current,forecast};
    cache.set(q.toLowerCase(),{t:Date.now(),d});
    return NextResponse.json(d);
  }catch(e:any){ return NextResponse.json({error:e.message||"Network error."},{status:500}); }
}
