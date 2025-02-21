import { Flowbite, Progress } from "flowbite-react";
import axios from "axios";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// flowbite-reactのカスタムテーマ
const customTheme = {
  progress: {
    color: {
      primaryLight: "bg-primary-light",
    },
    size: {
      lgPlus: "h-5",
    }
  },
};

export const FoodConversion = () => {
  const [foodList, setFoodList] = useState([]);
  const state = useLocation();
  const calorie = state.state.burned_calorie;

  const calorieToFoodCount = (foodCalorie) => Math.round((calorie / foodCalorie) * 10) / 10;
  const foodPercentage = (foodCalorie) => Math.round((calorie / foodCalorie) * 100);
  
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

  return (
    <>
      <h2>〇〇さんの消費カロリーは...{calorie}kcal🔥</h2>
      <p>これは以下の食べ物の個数分に該当します</p>
      <ul>
        {foodList.map((food, index) => {
          return (
            <li key={index} className="w-1/3">
              <p>{food.name}</p>
              <p>{food.calorie}kcal</p>
              <p>{calorieToFoodCount(food.calorie)}個分</p>
              <p>
                {
                  foodPercentage(food.calorie) >= 100 ? (
                  <p><span className="text-primary">{foodPercentage(food.calorie)}%</span>を消費</p> 
                  ) : (<p>{foodPercentage(food.calorie)}%を消費</p>)
                }
              </p>
              <div className="relative w-48">
                <div className="flex justify-between font-bold text-sm">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
                <Flowbite theme={{theme: customTheme}}>
                  <Progress progress={foodPercentage(food.calorie)} size="lgPlus" color="primaryLight" className="bg-slate-200" />
                </Flowbite>
              </div>
            </li>
          )
        })}
      </ul>
    </>
  );
}
