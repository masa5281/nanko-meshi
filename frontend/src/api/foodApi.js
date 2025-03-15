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
