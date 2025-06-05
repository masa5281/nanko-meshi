export const FoodCard = ({ food, children }) => {
  return (
    <li className="max-h-[90px] md:max-h-[115px] flex p-3 bg-white rounded-lg shadow-sm shadow-shadow">
      <div className="max-w-28 ma-h-28 md:max-w-36 md:max-h-36 w-full mr-4 pr-4 border-r-2">
        <img src={food.food_image.thumb.url} alt="食品画像" className="w-full h-full rounded-md object-cover" />
      </div>
      <div className="flex flex-col justify-between w-full">
        <p className={`${food.name.length >= 12 ? "text-xs md:text-sm lg:text-base" : "text-sm md:text-lg"} text-black font-bold text-left`}>{food.name}</p>
        <div className="flex justify-between items-end">
          <p className="inline-block max-w-24 px-2 py-1 bg-primary-deep rounded-lg text-white text-lg">
            <span className="md:text-2xl lg:text-3xl">{food.calorie}</span>kcal
          </p>
          <div className="relative flex justify-end">
            {food.user && (
              <div className="max-w-7 max-h-7 mr-1">
                <img src={food.user.avatar.icon.url} alt="ユーザーアイコン" className="w-full rounded-full" />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </li>
  );
};
