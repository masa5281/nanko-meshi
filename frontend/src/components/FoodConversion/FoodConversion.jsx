// モジュール
import { useUserDataContext } from "../../context/UserDataContext";
import { useFoodApi } from "../../hooks/useFoodApi";
// コンポーネント
import { FoodItem } from "./FoodItem";
// ライブラリ
import { useLocation } from "react-router-dom";

export const FoodConversion = () => {
  const { dbUserData } = useUserDataContext();
  const { myFoodList, favoritedFood } = useFoodApi();
  const state = useLocation();
  const inputCalorie = state.state?.burnedCalorie;
  // 自分の登録した食品とお気に入りした食品を結合
  const conversionFoods = [...myFoodList, ...favoritedFood];

  return (
    <>
      <div className="mb-8 text-center">
        <p className="mb-3 text-4xl font-bold">{dbUserData.name}<span className="text-lg">さん</span>の消費カロリーは</p>
        <div className="relative max-w-48 py-2 mx-auto text-white bg-primary rounded-lg text-7xl font-bold z-10 shadow-sm shadow-shadow after:content-[''] after:absolute after:top-16 after:left-1/2 after:-translate-x-1/2 after:border-t-40 after:border-r-50 after:border-l-50 after:border-x-transparent after:border-primary after:-z-10">
          <p className="relative -top-1">{inputCalorie}<span className="text-3xl">kcal</span></p>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-8 w-3/4 mx-auto">
        {conversionFoods.map((food) =>
          <FoodItem key={food.id} food={food} inputCalorie={inputCalorie} />
        )}
      </ul>
    </>
  );
};
