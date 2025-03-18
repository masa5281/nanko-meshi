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
    <>
      <h2 className="">登録した食品</h2>
      <ul>
        {foodList.map((food, index) => {
          return (
            <li key={index}>
              <div>
                <img src={food.food_image.thumb.url} alt="" />
              </div>
              <p>{food.name}</p>
              <p>{food.calorie}</p>
            </li>
          )
        })}
      </ul>
    </>
  );
};
