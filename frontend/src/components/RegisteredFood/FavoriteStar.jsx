import { IconProvider } from "../IconProvider";
import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { useFoodApi } from "../../hooks/useFoodApi";

export const FavoriteStar = ({ food, setList }) => {
  const {
    createFavoriteFood,
    deleteFavoriteFood,
  } = useFoodApi();

  const handleCreateFavorite = async (food) => {
    try {
      await createFavoriteFood(food);
      setList(prevSetList =>
        prevSetList.map(prevFood => prevFood.id === food.id ? { ...prevFood, is_favorited: true } : prevFood)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFavorite = async (food) => {
    try {
      await deleteFavoriteFood(food);
      setList(prevSetList =>
        prevSetList.map(prevFood => prevFood.id === food.id ? { ...prevFood, is_favorited: false } : prevFood)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
};
