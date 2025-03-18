import { API_ENDPOINTS } from "../utils/constants";
import { axiosClient } from "../config/axiosClient";

// 全ての食品情報を取得
export const getFoodsApi = async () => {
  try {
    const response = await axiosClient.get(API_ENDPOINTS.FOODS.BASE);
    return response.data
  } catch (error) {
    throw error;
  }
};

// FormData送信の準備
export const createFoodFormData = (foodName, foodCalorie, foodImage) => {
  const formData = new FormData();
  formData.append("food[name]", foodName);
  formData.append("food[calorie]", foodCalorie);
  if (foodImage instanceof File) {
    formData.append("food[food_image]", foodImage);
  }
  return formData;
};
