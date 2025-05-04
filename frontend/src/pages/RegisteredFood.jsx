// コンポーネント
import { MyRegisteredFood } from "../components/RegisteredFood/MyRegisteredFood";
import { AllRegisteredFood } from "../components/RegisteredFood/AllRegisteredFood";
import { FavoritedFood } from "../components/RegisteredFood/FavoritedFood";
import { TabLabel } from "../components/RegisteredFood/TabLabel";
// ライブラリ
import { FormProvider, useForm } from "react-hook-form";
import { motion } from "motion/react";
import { useState } from "react";

export const RegisteredFood = () => {
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const [selectTab, setSelectTab] = useState("registeredFood");
  const [selectLabel, setSelectLabel] = useState("myFood");

  // アニメーションをstateに応じて変化
  const variants = {
    registeredFood: { x: 0 },
    allFood: { x: 155 },
  };

  const onSelectTab = (tabName) => {
    setSelectTab(tabName);
    setSelectLabel("myFood");
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl mx-auto text-center">
        <div className="relative flex gap-8 justify-center w-80 py-3 mb-6 mx-auto bg-white rounded-full text-xl shadow-sm shadow-shadow">
          <TabLabel selectTab={selectTab} tabText="registeredFood" onSelectTab={onSelectTab}>登録した食品</TabLabel>
          <TabLabel selectTab={selectTab} tabText="allFood" onSelectTab={onSelectTab}>みんなの食品</TabLabel>
          <motion.span
            className="absolute top-1.5 left-2 w-[150px] h-10 bg-primary rounded-full"
            initial={false}
            animate={selectTab}
            variants={variants}
            transition={{ type: "tween" }}
          >
          </motion.span>
        </div>

        {selectTab === "registeredFood" && (
          <>
            <select
              value={selectLabel}
              onChange={e => setSelectLabel(e.target.value)}
              className="mb-5 border-secondary border-2 rounded-lg focus:border-secondary focus:ring-secondary focus:ring-1"
            >
              <option value={"myFood"}>自分の食品</option>
              <option value={"favoriteFood"}>お気に入り食品</option>
            </select>
            {selectLabel === "myFood" ? <MyRegisteredFood /> : <FavoritedFood />}
          </>
        )}
        {selectTab === "allFood" && (
          <AllRegisteredFood />
        )}
      </div>
    </FormProvider>
  );
};
