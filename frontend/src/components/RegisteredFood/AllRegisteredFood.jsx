import { useFoodApi } from "../../hooks/useFoodApi";

export const AllRegisteredFood = () => {
  const { otherFoodList } = useFoodApi();
  console.log(otherFoodList);

  return (
    <></>
  );
};
