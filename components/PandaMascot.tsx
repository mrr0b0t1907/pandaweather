"use client";
import { AnimatePresence, motion } from "framer-motion";
import PandaAnimation from "./PandaAnimation";
import { THEME, type Condition } from "@/lib/weatherMap";
export default function PandaMascot({condition}:{condition:Condition}){
  return <div className="flex flex-col items-center gap-3">
    <AnimatePresence mode="wait"><motion.div key={condition+"msg"} initial={{opacity:0,y:8,scale:.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0}} className="glass rounded-3xl px-5 py-3 text-center font-bold max-w-xs relative">
      Hello there! 🐼 {THEME[condition].hello}</motion.div></AnimatePresence>
    <AnimatePresence mode="wait"><motion.div key={condition} initial={{opacity:0,scale:.9}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.9}} transition={{duration:.4}} className="w-full flex justify-center">
      <PandaAnimation c={condition}/></motion.div></AnimatePresence>
  </div>;
}
