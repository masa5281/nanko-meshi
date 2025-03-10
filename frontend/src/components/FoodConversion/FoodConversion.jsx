// モジュール
import { getFoodsApi } from "../../api/foodApi";
// コンポーネント
import { FoodItem } from "./FoodItem";
// ライブラリ
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const FoodConversion = () => {
  const [foodList, setFoodList] = useState([]);
  const state = useLocation();
  const manualCalorie = state.state?.burned_calorie;

  useEffect(() => {
    const getFoodList = async () => {
      try {
        const foodData = await getFoodsApi();
        setFoodList(foodData);
      } catch (error) {
        console.error(error);
      }
    }
    getFoodList();
  }, []);

  return (
    <>
      <div className="mb-8 text-center">
        <p className="mb-3 text-4xl font-bold">〇〇<span className="text-lg">さん</span>の消費カロリーは</p>
        <div className="relative max-w-48 py-2 mx-auto text-white bg-primary rounded-lg text-7xl font-bold z-10 shadow-sm shadow-shadow after:content-[''] after:absolute after:top-16 after:left-1/2 after:-translate-x-1/2 after:border-t-40 after:border-r-50 after:border-l-50 after:border-x-transparent after:border-primary after:-z-10">
          <p className="relative -top-1">{manualCalorie}<span className="text-3xl">kcal</span></p>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-8 w-3/4 mx-auto">
        {foodList.map((food) => {
          return (
            <FoodItem key={food.id} food={food} manualCalorie={manualCalorie} />
          )
        })}
      </ul>
    </>
  );
}
