// コンポーネント
import { FoodEditForm } from "./FoodEditForm";
import { FoodDeleteForm } from "./FoodDeleteForm";
// ライブラリ
import { createContext, useContext, useState } from "react";
import { Dropdown } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import Modal from 'react-modal';
import { motion } from "motion/react";
import { toast } from 'react-toastify';
// アイコン
import { BsThreeDots } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
// flowbite-reactのカスタムテーマ
import { foodCustomTheme } from "../../theme/theme";
// カスタムフック
import { useFoodApi } from "../../hooks/useFoodApi";
// モーダルのスタイル
import { modalStyle } from "../../theme/modalStyle"

const CloseModalContext = createContext();
export const useCloseModalContext = () => useContext(CloseModalContext);

const notifyContext = createContext();
export const useNotifyContext = () => useContext(notifyContext);

export const RegisterdFoodItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectFood, setSelectFood] = useState({});
  const [modalType, setModalType] = useState("");
  const { foodList, setFoodList } = useFoodApi();
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
    setSelectFood({});
    document.querySelector("body").classList.remove("modal--open");
  };

  const updateFoodNotofy = () => {
    toast.success("食品を更新しました", {
    });
  };

  const deleteFoodNotify = () => {
    toast.error("食品を削除しました", {
    });
  };

  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="inline-block mb-8 px-5 py-3 bg-black rounded-full text-white text-3xl">登録した食品</h2>

      <Modal
        isOpen={isOpen}
        style={modalStyle}
        bodyOpenClassName="modal--open"
        contentElement={(props, children) => (
          <motion.div
            {...props}
            initial={{ opacity: 0.5, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      >
        <notifyContext.Provider value={{updateFoodNotofy, deleteFoodNotify}}>
          <CloseModalContext.Provider value={closeModal}>
            {modalType === "edit" && selectFood && (
              <FoodEditForm
                selectFood={selectFood}
                setSelectFood={setSelectFood}
                isOpen={isOpen}
                setFoodList={setFoodList}
              />
            )}
            {modalType === "delete" && selectFood && (
              <FoodDeleteForm
                selectFood={selectFood}
                isOpen={isOpen}
                setFoodList={setFoodList}
              />
            )}
          </CloseModalContext.Provider>
        </notifyContext.Provider>
      </Modal>

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
