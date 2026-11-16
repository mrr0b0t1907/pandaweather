export type Condition = "sunny"|"clear"|"cloudy"|"fog"|"rain"|"storm"|"snow"|"cold"|"windy";
export type Audio = "birds"|"calm"|"rain"|"storm"|"snowwind"|"wind";
export interface Current { temperature:number; feelslike:number; weather_code:number; weather_descriptions:string[]; wind_speed:number; wind_dir:string; pressure:number; humidity:number; visibility:number; uv_index:number; precip:number; is_day:string }
export interface Location { name:string; country:string; region:string; localtime:string }
export interface Day { mintemp:number; maxtemp:number; avgtemp:number; astro?:{sunrise:string;sunset:string} }
export interface WeatherData { location:Location; current:Current; forecast:Record<string,Day>|null }
const S=(a:number[])=>new Set(a);
const STORM=S([200,386,389,392,395]);
const SNOW=S([179,182,185,227,230,281,284,317,320,323,326,329,332,335,338,350,362,365,368,371,374,377]);
const RAIN=S([176,263,266,293,296,299,302,305,308,311,314,353,356,359]);
const FOG=S([143,248,260]);
export function getCondition(c:Current):Condition{
  const code=c.weather_code, t=c.temperature, day=c.is_day!=="no";
  if(STORM.has(code)) return "storm";
  if(SNOW.has(code)) return t<=-8?"cold":"snow";
  if(RAIN.has(code)) return "rain";
  if(FOG.has(code)) return "fog";
  if(t<=-5) return "cold";
  if(c.wind_speed>=38) return "windy";
  if(code===113) return day?"sunny":"clear";
  return "cloudy";
}
export const THEME:Record<Condition,{sky:[string,string];audio:Audio;hello:string}>={
  sunny:{sky:["#7fd1ff","#ffe9a8"],audio:"birds",hello:"It's sunny! Sunglasses on, and drink some water. 🕶️"},
  clear:{sky:["#2b2f6b","#8e7cc3"],audio:"calm",hello:"A calm, clear night. Time to get sleepy… 🌙"},
  cloudy:{sky:["#b7c4d6","#e6dcef"],audio:"calm",hello:"Cloudy and quiet today. A good day for a nap. ☁️"},
  fog:{sky:["#c9d3da","#eef0f2"],audio:"calm",hello:"It's foggy! Wear a scarf and watch your step. 🌫️"},
  rain:{sky:["#5b7fa6","#a9c3dc"],audio:"rain",hello:"It's raining today. Don't forget your umbrella! ☔"},
  storm:{sky:["#2c3150","#5a5f86"],audio:"storm",hello:"Thunder! Eek! Stay inside if you can. ⚡"},
  snow:{sky:["#a9d6f5","#f2f8ff"],audio:"snowwind",hello:"Snow! Put on your jacket, hat and gloves. ❄️"},
  cold:{sky:["#8fc4ee","#dff1ff"],audio:"snowwind",hello:"Brrr, it's freezing! Hot chocolate time. 🥶"},
  windy:{sky:["#8fd3d0","#e3f4d7"],audio:"wind",hello:"So windy! Hold onto your scarf. 🌬️"},
};
export const toF=(c:number)=>Math.round(c*9/5+32);
