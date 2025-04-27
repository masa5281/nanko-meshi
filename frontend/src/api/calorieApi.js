import { API_ENDPOINTS } from "../utils/constants";
import { axiosClient } from "../config/axiosClient";

// カロリーを取得
export const getCalorieApi = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.CALORIE.BASE);
  return response.data;
};

// カロリーを作成
export const createCalorieApi = async (calorieNum, recordedDate) => {
  const response = await axiosClient.post(API_ENDPOINTS.CALORIE.BASE, {
    burned_calorie: calorieNum,
    recorded_at: recordedDate,
  });
  return response.data;
};
