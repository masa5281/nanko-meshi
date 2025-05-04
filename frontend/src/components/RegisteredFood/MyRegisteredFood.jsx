// コンポーネント
import { FoodEditForm } from "./FoodEditForm";
import { FoodDeleteForm } from "./FoodDeleteForm";
import { CustomModal } from "../CustomModal";
// ライブラリ
import { useState } from "react";
import { useFormContext } from "react-hook-form";
// カスタムフック
import { useFoodApi } from "../../hooks/useFoodApi";
import { FoodSquareCard } from "./FoodSquareCard";
import { FoodEditMenu } from "./FoodEditMenu";

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

  const closeFoodModal = () => setIsOpen(false);

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
      <ul className="grid grid-cols-3 gap-12 px-20">
        {myFoodList.map((food) =>
          <FoodSquareCard key={food.id} food={food} >
            <FoodEditMenu food={food} openFoodModal={openFoodModal} />
          </FoodSquareCard>
        )}
      </ul>
    </>
  );
};
