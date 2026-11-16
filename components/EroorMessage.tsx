"use client";
export default function ErrorMessage({message,onRetry}:{message:string;onRetry:()=>void}){
  return <div role="alert" className="glass rounded-3xl p-5 max-w-md mx-auto mt-6 text-center">
    <div className="text-4xl">🐼💦</div><p className="mt-2 font-bold">{message}</p>
    <button onClick={onRetry} className="mt-3 bg-white/80 rounded-full px-4 py-1.5 font-bold hover:scale-105 transition">Try again</button></div>;
}
