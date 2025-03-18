import { useEffect, useState } from "react";
import { getFoodsApi } from "../../api/foodApi";

export const RegisterdFoodItem = () => {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const getFoodList = async () => {
      try {
        const foodData = await getFoodsApi();
        setFoodList(foodData);
      } catch (error) {
        console.error(error);
      }
    }
    getFoodList();
  }, []);

  console.log(foodList);

  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="inline-block mb-8 px-5 py-3 bg-black rounded-full text-white text-4xl">登録した食品</h2>
      <ul className="grid grid-cols-3 gap-14 px-20">
        {foodList.map((food, index) => {
          return (
            <li key={index} className="flex flex-col justify-center px-8 py-4 bg-white rounded-lg shadow-sm shadow-shadow">
              <div className="mb-3 border-b-2">
                <img src={food.food_image.thumb.url} alt="" className="mx-auto mb-3 rounded-lg" />
              </div>
              <p className="inline-block mb-3 bg-amber-500 rounded-lg text-white text-lg">{food.name}</p>
              <p className="text-lg"><span className="text-3xl">{food.calorie}</span>kcal</p>
            </li>
          )
        })}
      </ul>
    </div>
  );
};
