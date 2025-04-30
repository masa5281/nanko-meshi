import { useFoodApi } from "../../hooks/useFoodApi";
import { FavoriteStar } from "./FavoriteStar";

export const AllRegisteredFood = () => {
  const {
    otherFoodList,
    setOtherFoodList,
  } = useFoodApi();

  return (
    <ul className="grid grid-cols-2 gap-8 w-3/4 mx-auto">
      {otherFoodList.map((food) => {
        return (
          <li key={food.id} className="flex p-3 bg-white rounded-lg shadow-sm shadow-shadow">
            <div className="max-w-36 max-h-36 w-full mr-4 pr-4 border-r-2">
              <img src={food.food_image.thumb.url} alt="食品画像" className="w-full h-full rounded-md" />
            </div>
            <div className="flex flex-col justify-between w-full">
              <p className={`${food.name.length >= 15 ? "text-sm" : "text-lg"} text-black font-bold text-left`}>{food.name}</p>
              <div className="flex justify-between items-end">
                <p className="inline-block max-w-24 px-2 py-1 bg-primary-deep rounded-lg text-white text-lg">
                  <span className="text-3xl">{food.calorie}</span>kcal
                </p>
                <div className="flex items-center">
                  <img src={food.user.avatar.icon.url} alt="ユーザーアイコン" className="w-[30px] h-[30px] mr-1 rounded-full" />
                  <FavoriteStar food={food} setList={setOtherFoodList} />
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  );
};
