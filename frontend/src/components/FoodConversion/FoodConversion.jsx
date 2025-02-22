import { Flowbite, Progress } from "flowbite-react";
import axios from "axios";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useMotionValue, useMotionValueEvent, animate } from "motion/react";

// flowbite-reactのカスタムテーマ
const customTheme = {
  progress: {
    color: {
      primaryLight: "bg-primary-light",
      redBar: "bg-redBar"
    },
    size: {
      lgPlus: "h-5",
    }
  },
};

export const FoodConversion = () => {
  const [foodList, setFoodList] = useState([]);
  const state = useLocation();
  const manualCalorie = state.state.burned_calorie;

  const calorieToFoodCount = (foodCalorie) => Math.round((manualCalorie / foodCalorie) * 10) / 10;
  const foodPercentage = (foodCalorie) => Math.round((manualCalorie / foodCalorie) * 100);
  const progressColor = (foodCalorie) => (foodPercentage(foodCalorie) >= 100) ? "redBar" : "primaryLight";
  
  const getFoodList = async () => {
    try  {
      const response = await axios.get("http://localhost:3000/api/v1/foods"); 
      setFoodList(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFoodList();
  }, []);

  // プログレスバーをアニメーション
  const AnimateProgress = ({foodCalorie}) => {
    const initialValue = useMotionValue(0);
    const [progressValue, setProgressValue] = useState(0);
    
    useMotionValueEvent(initialValue, "change", (latest) => {
      setProgressValue(Math.round(latest));
    })
    useEffect(() => {
      const target = foodPercentage(foodCalorie);
      animate(initialValue, target, { duration: 2 });
    }, [initialValue, foodCalorie]);

    return (
      <Progress progress={progressValue} size="lgPlus" color={progressColor(foodCalorie)} className="bg-slate-200" />
    )
  }

  return (
    <>
      <div className="mb-8 text-center">
        <p className="mb-3 text-4xl font-bold">〇〇<span className="text-lg">さん</span>の消費カロリーは</p>
        <div className="relative max-w-48 py-2 mx-auto text-white bg-primary rounded-lg text-7xl font-bold z-10 shadow-sm shadow-shadow after:content-[''] after:absolute after:top-16 after:left-1/2 after:-translate-x-1/2 after:border-t-40 after:border-r-50 after:border-l-50 after:border-x-transparent after:border-primary after:-z-10">
          <p className="relative -top-1">{manualCalorie}<span className="text-3xl">kcal</span></p>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-8 w-3/4 mx-auto">
        {foodList.map((food, index) => {
          return (
            <li key={index} className="flex p-4 bg-white rounded-lg shadow-sm shadow-shadow">
              <div className="mr-4 pr-4 border-r-2 text-center">
                <div className="max-w-24 max-h-24 mb-1 rounded-full overflow-hidden">
                  <img src={food.food_image.thumb.url} alt="食品画像" className="w-full h-full" />
                </div>
                <p>{food.calorie}kcal</p>
              </div>

              <div className="flex flex-col flex-grow-2 justify-around">
                <p className="text-xl font-bold">{food.name}</p>
                <div className="flex items-end">
                  <div className="max-w-32 mr-5 px-1 bg-secondary rounded-xl text-white font-bold text-center">
                    <p className="relative -top-1 text-5xl">{calorieToFoodCount(food.calorie)}<span className="text-2xl">個分</span></p>
                  </div>

                  <div className="flex flex-col flex-grow-2 relative max-w-52 ml-auto">
                    {
                      foodPercentage(food.calorie) >= 100 ? (
                      <p className="text-3xl font-bold text-center"><span className="text-4xl text-redBar">{foodPercentage(food.calorie)}%</span>を消費</p>
                      ) : (<p className="text-2xl font-bold text-center"><span className="text-4xl">{foodPercentage(food.calorie)}%</span>を消費</p>)
                    }
                    <div className="flex justify-between font-bold text-sm">
                      <span>0</span>
                      <span>50</span>
                      <span>100</span>
                    </div>
                    <Flowbite theme={{theme: customTheme}}>
                      <AnimateProgress foodCalorie={food.calorie} />
                    </Flowbite>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  );
}
