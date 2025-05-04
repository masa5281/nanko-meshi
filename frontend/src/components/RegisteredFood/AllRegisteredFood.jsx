import { useFoodApi } from "../../hooks/useFoodApi";
import { FavoriteStar } from "./FavoriteStar";
import { FoodCard } from "./FoodCard";

export const AllRegisteredFood = () => {
  const {
    otherFoodList,
    setOtherFoodList,
  } = useFoodApi();

  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-6 max-w-xs md:max-w-3xl lg:max-w-7xl mx-auto md:px-5">
      {otherFoodList.map((food) =>
        <FoodCard key={food.id} food={food}>
          <FavoriteStar food={food} setList={setOtherFoodList} />
        </FoodCard>
      )}
    </ul>
  );
};
