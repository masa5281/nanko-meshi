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

// 食品を登録
export const createFoodApi = (name, calorie, foodImage) => {
  const formData = new FormData();
  formData.append("food[name]", name);
  formData.append("food[calorie]", calorie);
  formData.append("food[food_image]", foodImage);
  return formData;
}
