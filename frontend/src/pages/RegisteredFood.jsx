import { FormProvider, useForm } from "react-hook-form";
import { MyRegisteredFood } from "../components/RegisterdFood/MyRegisteredFood";
import { AllRegisteredFood } from "../components/RegisterdFood/AllRegisteredFood";
import { motion } from "motion/react";
import { useState } from "react";

export const RegisteredFood = () => {
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const [selectTab, setSelectTab] = useState("myFood");

  // アニメーションをstateに応じて変化
  const variants = {
    myFood: { x: 0 },
    allFood: { x: 155 },
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl mx-auto text-center">
        <div className="relative w-80 py-3 mb-8 mx-auto bg-white rounded-full text-xl shadow-sm shadow-shadow">
          <div className=" flex gap-8 justify-center">
            <p
              className={`${selectTab === "myFood" ? "text-white" : "text-black"} z-10 hover:cursor-pointer`}
              onClick={() => setSelectTab("myFood")}
            >
              登録した食品
            </p>
            <p
              className={`${selectTab === "allFood" ? "text-white" : "text-black"} z-10 hover:cursor-pointer`}
              onClick={() => setSelectTab("allFood")}
            >
              みんなの食品
            </p>
          </div>
          <motion.span
            className="absolute top-1.5 left-2 w-[150px] h-10 bg-primary rounded-full"
            initial={false}
            animate={selectTab}
            variants={variants}
            transition={{ type: "tween" }}
          >
          </motion.span>
        </div>

        {selectTab === "myFood" && (
          <MyRegisteredFood />
        )}
        {selectTab === "allFood" && (
          <AllRegisteredFood />
        )}
      </div>
    </FormProvider>
  );
};
