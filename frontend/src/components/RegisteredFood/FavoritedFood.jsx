import { useFoodApi } from "../../hooks/useFoodApi";
import { FoodSquareCard } from "./FoodSquareCard";
import { FavoriteStar } from "./FavoriteStar";

export const FavoritedFood = () => {
  const {
    favoritedFood,
    setFavoritedFood,
  } = useFoodApi();

  return (
    <ul className="grid grid-cols-3 gap-12 px-20">
      {favoritedFood.map((food) =>
        <FoodSquareCard key={food.id} food={food}>
          <div className="absolute top-3 right-3">
            <FavoriteStar food={food} setList={setFavoritedFood} />
          </div>
        </FoodSquareCard>
      )}
    </ul>
  );
};
