import { useEffect, useState } from "react";
import { createFoodFormData, deleteFoodApi, getMyFoodsApi, getOtherFoodApi } from "../api/foodApi";
import { axiosClient } from "../config/axiosClient";
import { API_ENDPOINTS } from "../utils/constants";

export const useFoodApi = () => {
  const [myFoodList, setMyFoodList] = useState([]);
  const [otherFoodList, setOtherFoodList] = useState([]);

  // ログインユーザーの食品一覧を取得
  useEffect(() => {
    const getFoods = async () => {
      const foodData = await getMyFoodsApi();
      setMyFoodList(foodData);
    }
    getFoods();
  }, []);

  // ログインユーザー以外の食品一覧を取得
  useEffect(() => {
    const getOtherFood = async () => {
      const foodData = await getOtherFoodApi();
      setOtherFoodList(foodData);
    }
    getOtherFood();
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
    myFoodList,
    setMyFoodList,
    otherFoodList,
    deleteFood,
    updateFood,
  };
};
