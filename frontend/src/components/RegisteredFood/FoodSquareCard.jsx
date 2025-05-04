export const FoodSquareCard = ({ food, children, }) => {
  return (
    <li className="relative px-6 py-5 bg-white rounded-lg shadow-sm shadow-shadow">
      {children}

      <div className="mb-3 border-b-2">
        <img src={food.food_image.thumb.url} alt="" className="mx-auto mb-3 rounded-lg" />
      </div>
      <p className="mb-3 text-black text-xl font-bold">{food.name}</p>
      <p className="inline-block px-2 py-1 bg-primary-deep rounded-lg text-white text-lg">
        <span className="text-3xl">{food.calorie}</span>kcal
      </p>
    </li>
  );
};
