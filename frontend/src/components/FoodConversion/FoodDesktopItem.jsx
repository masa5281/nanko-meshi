import { XShareButton } from "../Button/XShareButton";
import { AnimateProgress } from "./AnimateProgress";

export const FoodDesktopItem = ({
  food,
  foodCount,
  foodPercentage,
  className,
}) => {
  return (
    <li className={`${className} relative flex p-4 bg-white rounded-lg shadow-sm shadow-shadow`}>
      <XShareButton food={food} foodCount={foodCount} />

      <div className="flex flex-col justify-between mr-4 pr-4 border-r-2 text-center">
        <div className="max-w-24 max-h-[72px] rounded-md overflow-hidden">
          <img src={food.food_image.thumb.url} alt="食品画像" className="w-full h-full object-cover" />
        </div>
        <p><span className="text-xl">{food.calorie}</span>kcal</p>
      </div>
      <div className="flex flex-col flex-grow-2 justify-around">
        <p className={`${food.name.length >= 15 ? "text-base" : "text-xl"} lg:max-w-72 font-bold`}>{food.name}</p>
        <div className="flex items-end">
          <div className="max-w-32 mr-5 px-1 bg-secondary rounded-lg text-white font-bold text-center">
            <p className="relative -top-1 text-5xl">{foodCount}<span className="text-2xl">個分</span></p>
          </div>
          <div className="flex flex-col flex-grow-2 relative max-w-52 ml-auto">
            {
              foodPercentage(food.calorie) === 100 ? (
                <p className="text-2xl font-bold text-center">
                  <span className="text-4xl text-redBar">{foodPercentage(food.calorie)}%</span>以上消費
                </p>
              ) : (
                <p className="text-2xl font-bold text-center">
                  <span className="text-4xl">{foodPercentage(food.calorie)}%</span>
                  を消費
                </p>
              )
            }
            <div className="flex justify-between font-bold text-sm">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <AnimateProgress foodCalorie={food.calorie} foodPercentage={foodPercentage(food.calorie)} />
          </div>
        </div>
      </div>
    </li>
  );
};
