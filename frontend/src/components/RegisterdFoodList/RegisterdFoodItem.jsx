// コンポーネント
import { FoodEditModal } from "./FoodEditModal";
import { FoodDeleteModal } from "./FoodDeleteModal";
// ライブラリ
import { useState } from "react";
import ReactModal from "react-modal";
import { Dropdown } from "flowbite-react";
import { useFormContext } from "react-hook-form";
// アイコン
import { BsThreeDots } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
// flowbite-reactのカスタムテーマ
import { foodCustomTheme } from "../../theme/theme";
// カスタムフック
import { useFormUtils } from "../../hooks/useFormUtils";
import { useFoodApi } from "../../hooks/useFoodApi";

ReactModal.setAppElement('#root');

export const RegisterdFoodItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectFood, setSelectFood] = useState({});
  const [modalType, setModalType] = useState("");
  const { foodList, setFoodList } = useFoodApi();
  const {
    setFoodImage,
    setPreviewImage,
  } = useFormUtils();
  const { reset } = useFormContext();

  const openModal = (type, food) => {
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

  const closeModal = () => {
    setIsOpen(false);
    setPreviewImage("");
    setFoodImage("");
    setSelectFood("");
    document.querySelector("body").classList.remove("modal--open");
  };

  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="inline-block mb-8 px-5 py-3 bg-black rounded-full text-white text-3xl">登録した食品</h2>

      {modalType === "edit" && selectFood && (
        <FoodEditModal
          selectFood={selectFood}
          setSelectFood={setSelectFood}
          isOpen={isOpen}
          closeModal={closeModal}
          setFoodList={setFoodList}
        />
      )}
      {modalType === "delete" && selectFood && (
        <FoodDeleteModal
          selectFood={selectFood}
          isOpen={isOpen}
          closeModal={closeModal}
          setFoodList={setFoodList}
        />
      )}

      <ul className="grid grid-cols-3 gap-12 px-20">
        {foodList.map((food, index) => {
          return (
            <li key={index} className="relative px-8 py-4 bg-white rounded-lg shadow-sm shadow-shadow">
              <Dropdown label={
                <div className="p-1.5 bg-gray-200 rounded-full hover:bg-hoverGray">
                  <BsThreeDots />
                </div>
              }
                arrowIcon={false}
                inline={true}
                theme={foodCustomTheme}
              >
                <Dropdown.Item icon={FaPencilAlt} onClick={() => openModal("edit", food)}>編集</Dropdown.Item>
                <Dropdown.Item icon={FaTrashAlt} onClick={() => openModal("delete", food)} className="text-delete">削除</Dropdown.Item>
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
    </div>
  );
};
