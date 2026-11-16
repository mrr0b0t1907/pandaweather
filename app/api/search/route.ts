import { NextRequest, NextResponse } from "next/server";
// Autocomplete is a paid Weatherstack feature; on free plans this returns [] and the UI just hides suggestions.
export async function GET(req:NextRequest){
  const q = req.nextUrl.searchParams.get("q")?.trim().slice(0,60);
  const key = process.env.WEATHERSTACK_API_KEY;
  if(!q || q.length<2 || !key) return NextResponse.json([]);
  try{
    const u = new URL("https://api.apilayer.net/weatherstack/autocomplete"); u.searchParams.set("access_key",key); u.searchParams.set("query",q);
    const j = await (await fetch(u,{cache:"no-store"})).json();
    return NextResponse.json(j.error||!j.results ? [] : j.results.slice(0,5));
  }catch{ return NextResponse.json([]); }
}
