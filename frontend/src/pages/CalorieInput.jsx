import { ManualCalorieForm } from "../components/CalorieInput/ManualCalorieForm";
import { MetsCalorieForm } from "../components/CalorieInput/MetsCalorieForm";
import { motion } from "motion/react";

export const CalorieInput = () => {
  return (
    <div className="max-w-[350px] md:container mx-auto text-center">
      <div className="mt-8 mb-14 md:mb-20">
        <motion.h2 className="relative inline-block mb-3 text-black text-[28px] md:text-5xl font-bold gradient-marker">
          消費したカロリーを入力！
          <motion.span
            className="absolute bottom-0 md:-bottom-1 right-2 w-full h-3 bg-[#FFD700] -z-10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ type: "tween", duration: 0.5 }}
            style={{ transformOrigin: "left" }}
          >
          </motion.span>
        </motion.h2>
        <p className="text-black text-xs md:text-base font-bold">運動で消費したカロリーを食べ物の個数に換算できます！</p>
      </div>

      <div className="relative max-w-md md:max-w-lg mx-auto px-4 mb-16 md:mb-20 pt-12 pb-8 border-slate-900 border-4 rounded-md before:content-[''] before:absolute before:w-56 before:h-10 before:bg-background before:inline-block before:-top-5 before:left-1/2 before:-translate-x-1/2">
        <p className="absolute -top-7 left-1/2 -translate-x-1/2 w-52 mx-auto mb-5 py-2 rounded-full bg-black text-white text-2xl">
          直接入力する
        </p>
        <ManualCalorieForm />
      </div>

      <div className="relative max-w-lg mx-auto px-4 pt-12 pb-1 border-slate-900 border-4 rounded-md before:content-[''] before:absolute before:w-56 before:h-10 before:bg-background before:inline-block before:-top-5 before:left-1/2 before:-translate-x-1/2">
        <p className="absolute -top-7 left-1/2 -translate-x-1/2 w-52 mx-auto mb-5 py-2 rounded-full bg-black text-white text-2xl">
          METsで自動入力
        </p>
        <MetsCalorieForm />
        <div className="text-center">
          <small className="text-[9px] md:text-[11px]">※実際の消費カロリーは個人の体重・運動強度などにより異なります。</small>
        </div>
      </div>
      
    </div>
  );
};
