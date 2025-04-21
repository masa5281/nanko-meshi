import { API_ENDPOINTS } from "../utils/constants";
import { axiosClient } from "../config/axiosClient";

// カロリーを作成
export const createCalorieApi = async (calorieNum, recordedDate) => {
  const response = await axiosClient.post(API_ENDPOINTS.CALORIE.BASE, {
    burned_calorie: calorieNum,
    recorded_at: recordedDate,
  });
  return response.data;
};
