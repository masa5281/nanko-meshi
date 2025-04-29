import { useEffect, useState } from "react";
import { axiosClient } from "../../config/axiosClient";
import { API_ENDPOINTS } from "../../utils/constants";

export const FavoritedFood = () => {
  const [favoritedFood, setFavoritedFood] = useState([]);

  useEffect(() => {
    const getFavaritedFood = async () => {
      try {
        const foodData = await axiosClient.get(API_ENDPOINTS.FAVORITES.BASE);
        setFavoritedFood(foodData.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFavaritedFood();
  }, []);

  return (
    <ul className="grid grid-cols-3 gap-12 px-20">
      {favoritedFood.map((food) => {
        return (
          <li key={food.id} className="relative px-8 py-4 bg-white rounded-lg shadow-sm shadow-shadow">
            <div className="mb-3 border-b-2">
              <img src={food.food_image.thumb.url} alt="" className="mx-auto mb-3 rounded-lg" />
            </div>
            <p className="mb-3 text-black text-xl font-bold">{food.name}</p>
            <p className="inline-block mb-3 px-2 py-1 bg-primary-deep rounded-lg text-white text-lg"><span className="text-3xl">{food.calorie}</span>kcal</p>
          </li>
        )
      })}
    </ul>
  );
};
