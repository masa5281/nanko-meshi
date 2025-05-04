// コンポーネント
import { FoodEditForm } from "./FoodEditForm";
import { FoodDeleteForm } from "./FoodDeleteForm";
import { CustomModal } from "../CustomModal";
import { FoodCard } from "./FoodCard";
import { FoodEditMenu } from "./FoodEditMenu";
// ライブラリ
import { useState } from "react";
import { useFormContext } from "react-hook-form";
// カスタムフック
import { useFoodApi } from "../../hooks/useFoodApi";

export const MyRegisteredFood = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectFood, setSelectFood] = useState({});
  const [modalType, setModalType] = useState("");
  const { myFoodList, setMyFoodList } = useFoodApi();
  const { reset } = useFormContext();

  const openFoodModal = (type, food) => {
    setSelectFood(food);
    setModalType(type);
    setIsOpen(true);
    // 編集フォームの初期値を設定
    if (type === "edit") {
      reset({
        foodName: food.name,
        foodCalorie: food.calorie
      }, { keepErrors: true });
    }
  };

  const closeFoodModal = () => {
    setIsOpen(false);
    document.querySelector("body").classList.remove("modal--open");
  };

  return (
    <>
      {modalType === "edit" && selectFood && (
        <CustomModal isOpen={isOpen} title={"食品情報を変更"}>
          <FoodEditForm
            selectFood={selectFood}
            setSelectFood={setSelectFood}
            setMyFoodList={setMyFoodList}
            closeFoodModal={closeFoodModal}
          />
        </CustomModal>
      )}
      {
        modalType === "delete" && selectFood && (
          <CustomModal isOpen={isOpen} title={"食品を削除しますか？"}>
            <FoodDeleteForm
              selectFood={selectFood}
              setMyFoodList={setMyFoodList}
              closeFoodModal={closeFoodModal}
            />
          </CustomModal>
        )
      }
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-6 max-w-xs md:max-w-3xl lg:max-w-7xl mx-auto md:px-5">
        {myFoodList.map((food) =>
          <FoodCard key={food.id} food={food} >
            <FoodEditMenu food={food} openFoodModal={openFoodModal} />
          </FoodCard>
        )}
      </ul>
    </>
  );
};
