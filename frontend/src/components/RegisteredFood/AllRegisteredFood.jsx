import { useFoodApi } from "../../hooks/useFoodApi";
import { TiStarOutline } from "react-icons/ti";
import { IconProvider } from "../IconProvider";
import { TiStarFullOutline } from "react-icons/ti";

export const AllRegisteredFood = () => {
  const {
    otherFoodList,
    setOtherFoodList,
    createFavoriteFood,
    deleteFavoriteFood,
  } = useFoodApi();

  const handleCreateFavorite = async (food) => {
    try {
      await createFavoriteFood(food);
      setOtherFoodList(prevOtherFoodList =>
        prevOtherFoodList.map(prevFood => prevFood.id === food.id ? { ...prevFood, is_favorited: true } : prevFood)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFavorite = async (food) => {
    try {
      await deleteFavoriteFood(food);
      setOtherFoodList(prevOtherFoodList =>
        prevOtherFoodList.map(prevFood => prevFood.id === food.id ? { ...prevFood, is_favorited: false } : prevFood)
      );
    } catch (error) {
      console.error(error);
    }
  };

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
                  <IconProvider size={30} color="#FFC107">
                    {food.is_favorited ? (
                      <TiStarFullOutline
                        className="hover:cursor-pointer"
                        onClick={() => handleDeleteFavorite(food)}
                      />
                    ) : (
                      <TiStarOutline
                        className="hover:cursor-pointer"
                        onClick={() => handleCreateFavorite(food)}
                      />
                    )}
                  </IconProvider>
                </div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  );
};
