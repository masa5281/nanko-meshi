// コンポーネント
import { CloseModalButton } from "../Button/CloseModalButton";
// モジュール
import { useFoodApi } from "../../hooks/useFoodApi";
// アイコン
import { IoIosClose } from "react-icons/io";
// カスタムフック
import { useCloseModalContext, useNotifyContext } from "./RegisterdFoodItem";

export const FoodDeleteForm = (props) => {
  const closeModal = useCloseModalContext();
  const { deleteFood } = useFoodApi();
  const { deleteFoodNotify } = useNotifyContext();
  const {
    selectFood,
    setFoodList,
  } = props;

  const handleDeleteFood = async () => {
    try {
      await deleteFood(selectFood);
      setFoodList(prevFoodList =>
        prevFoodList.filter(food => food.id !== selectFood.id)
      );
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <p className="inline-block w-full mb-4 pb-2 text-2xl text-black font-bold">食品を削除しますか？</p>
      <button
        onClick={() => {
          handleDeleteFood();
          deleteFoodNotify();
        }}
        className="w-full inline-block relative mx-auto px-12 py-2 border-black border-2 rounded-full bg-delete text-white font-bold hover:bg-hover"
      >
        削除
      </button>
      <CloseModalButton>
        <IoIosClose />
      </CloseModalButton>
    </>
  );
};
