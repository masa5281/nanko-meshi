import axios from "axios";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const FoodConversion = () => {
  const [foodList, setFoodList] = useState([]);
  const state = useLocation();
  const calorie = state.state.burned_calorie;

  const calorieToFoodCount = (foodCalorie) => (Math.round((calorie / foodCalorie) * 10) / 10);
  
  const getFoodList = async () => {
    try  {
      const response = await axios.get("http://localhost:3000/api/v1/foods"); 
      setFoodList(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getFoodList();
  }, []);

  return (
    <>
      <h2>〇〇さんの消費カロリーは...{calorie}kcal🔥</h2>
      <p>これは以下の食べ物の個数分に該当します</p>
      <ul>
        {foodList.map((food, index) => {
          return (
            <li key={index}>
              <p>{food.name}</p>
              <p>{food.calorie}</p>
              <p>{calorieToFoodCount(food.calorie)}個分</p>
            </li>
          )
        })}
      </ul>
    </>
  );
}
