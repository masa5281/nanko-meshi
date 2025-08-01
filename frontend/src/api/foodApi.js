import { API_ENDPOINTS } from "../utils/constants";
import { axiosClient } from "../config/axiosClient";

// ログインユーザーの食品情報を取得
export const getMyFoodsApi = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.FOODS.BASE);
  return response.data;
};

// ログインユーザー以外の食品情報を取得
export const getOtherFoodApi = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.FOODS.OTHER);
  return response.data;
};

// FormData送信の準備
export const createFoodFormData = (foodName, foodCalorie, foodImage) => {
  const formData = new FormData();
  formData.append("food[name]", foodName);
  formData.append("food[calorie]", foodCalorie);
  if (foodImage && foodImage instanceof File) {
    formData.append("food[food_image]", foodImage);
  }
  return formData;
};

// 食品を削除
export const deleteFoodApi = async (foodId) => {
  const response = await axiosClient.delete(`${API_ENDPOINTS.FOODS.BASE}/${foodId}`);
  return response.data;
};

// お気に入り済み食品情報を取得
export const getFavoritedFoodAPI = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.FAVORITES.BASE);
  return response.data;
};

// 食品をお気に入り登録
export const createFavoriteFoodApi = async (foodId) => {
  const response = await axiosClient.post(`${API_ENDPOINTS.FOODS.BASE}/${foodId}/favorites`, {
    food_id: foodId
  });
  return response;
};

// 食品のお気に入りを解除
export const deleteFavoriteFoodApi = async (foodId) => {
  const response = await axiosClient.delete(`${API_ENDPOINTS.FOODS.BASE}/${foodId}/favorites`);
  return response.data;
};
