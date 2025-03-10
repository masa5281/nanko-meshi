import { axiosClient } from "./axiosClient";

// 全ての食品情報を取得
export const getFoodsApi = async () => {
  try {
    const response = await axiosClient.get("/api/v1/foods");
    return response.data
  } catch (error) {
    throw error;
  }
};

// カロリーを作成
export const createFoodApi = async (calorieNum, recordedDate) => {
  try {
    await axiosClient.post("/api/v1/calories", {
      burned_calorie: calorieNum,
      recorded_at: recordedDate
    });
  } catch (error) {
    throw error;
  }
};
