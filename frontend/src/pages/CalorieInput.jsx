import { ManualCalorieForm } from "../components/CalorieInput/ManualCalorieForm";
import { motion } from "motion/react";

export const CalorieInput = () => {
  return (
    <main className="h-screen">
      <div className="container mx-auto pt-12 text-center">
        <div className="mb-20">
          <motion.h2 className="relative inline-block mb-3 text-black text-5xl font-bold gradient-marker">
            消費したカロリーを入力！
            <motion.span
              className="absolute -bottom-1 right-2 w-full h-3 bg-[#FFD700] -z-10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ type: "tween", duration: 0.5 }}
              style={{ transformOrigin: "left" }}
            >
            </motion.span>
          </motion.h2>
          <p className="text-black text-base font-bold">運動で消費したカロリーを食べ物の個数に換算できます！</p>
        </div>
        <div className="relative max-w-lg mx-auto pt-12 pb-10 border-slate-900 border-4 rounded-md before:content-[''] before:absolute before:w-56 before:h-10 before:bg-background before:inline-block before:-top-5 before:left-1/2 before:-translate-x-1/2">
          <p className="absolute -top-7 left-1/2 -translate-x-1/2 w-52 mx-auto mb-5 py-2 rounded-full bg-black text-white text-2xl">直接入力する</p>
          <ManualCalorieForm />
        </div>
      </div>
    </main>
  );
}
