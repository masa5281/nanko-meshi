import { useNavigate } from "react-router-dom";
import { createCalorieApi } from "../api/calorieApi";
import { ROUTES } from "../utils/constants";

export const useCalorieApi = () => {
  const navigate = useNavigate();

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
    createCalorie,
  };
};
