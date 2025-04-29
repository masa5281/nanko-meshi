// コンポーネント
import { FoodEditForm } from "./FoodEditForm";
import { FoodDeleteForm } from "./FoodDeleteForm";
import { CustomModal } from "../CustomModal";
// ライブラリ
import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { useFormContext } from "react-hook-form";
// アイコン
import { BsThreeDots } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
// flowbite-reactのカスタムテーマ
import { foodCustomTheme } from "../../theme/theme";
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
        {myFoodList.map((food) => {
          return (
            <li key={food.id} className="relative px-8 py-4 bg-white rounded-lg shadow-sm shadow-shadow">
              <Dropdown label={
                <div className="p-1.5 bg-gray-200 rounded-full hover:bg-hoverGray">
                  <BsThreeDots />
                </div>
              }
                arrowIcon={false}
                inline={true}
                theme={foodCustomTheme}
              >
                <Dropdown.Item icon={FaPencilAlt} onClick={() => openFoodModal("edit", food)}>編集</Dropdown.Item>
                <Dropdown.Item icon={FaTrashAlt} onClick={() => openFoodModal("delete", food)} className="text-delete">削除</Dropdown.Item>
              </Dropdown>
              <div className="mb-3 border-b-2">
                <img src={food.food_image.thumb.url} alt="" className="mx-auto mb-3 rounded-lg" />
              </div>
              <p className="mb-3 text-black text-xl font-bold">{food.name}</p>
              <p className="inline-block mb-3 px-2 py-1 bg-primary-deep rounded-lg text-white text-lg"><span className="text-3xl">{food.calorie}</span>kcal</p>
            </li>
          )
        })}
      </ul>
    </>
  );
};
