import { useEffect, useState } from "react";
import { createFoodFormData, deleteFoodApi, getFoodsApi } from "../api/foodApi";
import { axiosClient } from "../config/axiosClient";
import { API_ENDPOINTS } from "../utils/constants";

export const useFoodApi = () => {
  const [foodList, setFoodList] = useState([]);

  // 食品一覧を取得
  useEffect(() => {
    const getFoods = async () => {
      const foodData = await getFoodsApi();
      setFoodList(foodData);
    }
    getFoods();
  }, []);

  // 食品を更新
  const updateFood = async (selectFood, foodImage) => {
    const data = createFoodFormData(
      selectFood.name,
      selectFood.calorie,
      foodImage ? foodImage : selectFood.food_image
    );
    const response = await axiosClient.patch(`${API_ENDPOINTS.FOODS.BASE}/${selectFood.id}`, data);
    return response.data;
  };

  // 食品を削除
  const deleteFood = async (selectFood) => {
    await deleteFoodApi(selectFood.id);
  };

  return {
    foodList,
    setFoodList,
    deleteFood,
    updateFood,
  };
};
