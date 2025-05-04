import { AnimateProgress } from "./AnimateProgress";

export const FoodMobileItem = ({
  food,
  calorieToFoodCount,
  foodPercentage,
  className,
}) => {
  return (
    <li className={`${className} p-4 bg-white rounded-lg shadow-sm shadow-shadow`}>
      <div className="flex mb-3">
        <div className="max-w-24 max-h-24 mr-2 rounded-md overflow-hidden">
          <img src={food.food_image.thumb.url} alt="食品画像" className="w-full h-full" />
        </div>
        <div>
          <p className={`${food.name.length >= 8 ? "text-sm" : "text-base"} mb-1 font-bold`}>{food.name}</p>
          <p><span className="text-xl">{food.calorie}</span>kcal</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-end mb-2">
          {
            foodPercentage(food.calorie) === 100 ? (
              <p className="text-lg md:text-2xl font-bold text-center">
                <span className="text-2xl md:text-4xl text-redBar">{foodPercentage(food.calorie)}%</span>
                以上消費
              </p>
            ) : (
              <p className="text-lg md:text-2xl font-bold text-center">
                <span className="text-2xl md:text-4xl">{foodPercentage(food.calorie)}%</span>
                を消費
              </p>
            )
          }
          <p className="max-w-32 p-1 bg-secondary rounded-lg text-white text-4xl font-bold">{calorieToFoodCount(food.calorie)}
            <span className="text-2xl">個分</span>
          </p>
        </div>
        <div className="flex justify-between font-bold text-sm">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
        <AnimateProgress foodCalorie={food.calorie} foodPercentage={foodPercentage(food.calorie)} />
      </div>
    </li>
  );
};
