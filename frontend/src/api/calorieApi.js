import { API_ENDPOINTS } from "../utils/constants";
import { axiosClient } from "./axiosClient";

// カロリーを作成
export const createCalorieApi = async (calorieNum, recordedDate) => {
  try {
    // console.log(calorieNum, recordedDate);
    const response = await axiosClient.post(API_ENDPOINTS.CALORIE.BASE, {
      burned_calorie: calorieNum,
      recorded_at: recordedDate
    });
    return response;
  } catch (error) {
    throw error;
  }
};
