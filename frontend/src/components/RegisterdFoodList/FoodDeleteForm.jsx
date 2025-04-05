import { useFoodApi } from "../../hooks/useFoodApi";
import { IoIosClose } from "react-icons/io";
import { IconProvider } from "../IconProvider";
import { toast } from 'react-toastify';

export const FoodDeleteForm = ({
  selectFood,
  setFoodList,
  closeFoodModal,
}) => {
  const { deleteFood } = useFoodApi();

  const handleDeleteFood = async () => {
    try {
      await deleteFood(selectFood);
      setFoodList(prevFoodList =>
        prevFoodList.filter(food => food.id !== selectFood.id)
      );
      closeFoodModal();
      deleteFoodNotify();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFoodNotify = () => toast.error("食品を削除しました");

  return (
    <>
      <button
        onClick={handleDeleteFood}
        className="w-full inline-block relative mx-auto px-12 py-2 border-black border-2 rounded-full bg-delete text-white font-bold hover:bg-hover"
      >
        削除
      </button>
      <button
        onClick={closeFoodModal}
        className="absolute top-1 right-1 rounded-full transition-all duration-200 hover:bg-gray-200"
      >
        <IconProvider size={30}>
          <IoIosClose />
        </IconProvider>
      </button>
    </>
  );
};
