import { FoodDesktopItem } from "./FoodDesktopItem";
import { FoodMobileItem } from "./FoodMobileItem";

export const FoodItem = ({
  food,
  inputCalorie,
}) => {
  const calorieToFoodCount = (foodCalorie) => Math.round((inputCalorie / foodCalorie) * 10) / 10;
  const foodPercentage = (foodCalorie) => {
    let percentage = Math.round((inputCalorie / foodCalorie) * 100);
    if (percentage >= 100) percentage = 100;
    return percentage;
  };

  return (
    <>
      <FoodDesktopItem
        food={food}
        foodCount={calorieToFoodCount(food.calorie)}
        foodPercentage={foodPercentage}
        className={"hidden md:flex"}
      />
      <FoodMobileItem
        food={food}
        foodCount={calorieToFoodCount(food.calorie)}
        foodPercentage={foodPercentage}
        className={"block md:hidden"}
      />
    </>
  );
};
