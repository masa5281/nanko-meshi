import { useNavigate } from "react-router-dom";
import { createCalorieApi, getCalorieApi } from "../api/calorieApi";
import { ROUTES } from "../utils/constants";
import { useEffect, useState } from "react";

export const useCalorieApi = () => {
  const [calorieList, setCalorieList] = useState(null);
  const navigate = useNavigate();

  // カロリー一覧を取得
  useEffect(() => {
    const getCalorie = async () => {
      const calorieData = await getCalorieApi();
      setCalorieList(calorieData);
    }
    getCalorie();
  }, [])

  // カロリーを作成
  const createCalorie = async (calorie, recordedDate) => {
    await createCalorieApi(calorie, recordedDate.toDateString());
    navigate(ROUTES.FOODS.CONVERSION, {
      state: {
        burnedCalorie: calorie,
      }
    });
  };

  return {
    calorieList,
    createCalorie,
  };
};
