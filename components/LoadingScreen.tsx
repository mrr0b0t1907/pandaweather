"use client";
import { motion } from "framer-motion";
export default function LoadingScreen(){
  return <div className="min-h-[60vh] grid place-items-center"><div className="text-center">
    <motion.div className="text-7xl" animate={{y:[0,-18,0],rotate:[-6,6,-6]}} transition={{repeat:Infinity,duration:1.1}}>🐼</motion.div>
    <p className="mt-3 font-bold">Looking out the window…</p></div></div>;
}
