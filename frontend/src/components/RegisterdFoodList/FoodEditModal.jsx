// コンポーネント
import { InputField } from "../InputField/InputField";
import { SubmitButton } from "../Button/SubmitButton";
// モジュール
import { useFormUtils } from "../../hooks/useFormUtils";
import { useFoodApi } from "../../hooks/useFoodApi";
// ライブラリ
import { IconContext } from "react-icons/lib";
import Modal from 'react-modal';
import { useRef } from "react";
// アイコン
import { FaCamera } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { FaFire } from "react-icons/fa6";
import { BiSolidBowlRice } from "react-icons/bi";
// カスタムフック
import { useValidateError } from "../../context/ValidateErrorContext";
// モーダルのスタイル
import { modalStyle } from "../../theme/modalStyle"
import { useFormContext } from "react-hook-form";

export const FoodEditModal = (props) => {
  const { setValidateErrors } = useValidateError();
  const { handleSubmit } = useFormContext();
  const { updateFood } = useFoodApi();
  const inputRef = useRef(null);
  const {
    selectFood,
    isOpen,
    setSelectFood,
    closeModal,
    setFoodList,
  } = props;
  const {
    foodImage,
    previewImage,
    onFileInputChange,
  } = useFormUtils();

  const handleUpdateFood = async () => {
    try {
      const response = await updateFood(selectFood, foodImage);
      setFoodList(prevFoodList =>
        prevFoodList.map(food => food.id === selectFood.id ? response : food)
      );
      closeModal();
    } catch (error) {
      setValidateErrors(error.response.data);
    }
  };

  const handleOnChange = (e, columnName) => {
    setSelectFood(prev => ({ ...prev, [columnName]: e.target.value }));
  };

  // ボタン押下でinputが発火
  const handleInputFile = (e) => {
    e.preventDefault();
    inputRef.current.click();
  }

  return (
    <Modal
      isOpen={isOpen}
      style={modalStyle}
      bodyOpenClassName="modal--open"
    >
      <h3 className="inline-block w-full mb-4 pb-2 text-2xl text-black font-bold">食品情報を変更</h3>

      <form onSubmit={handleSubmit(handleUpdateFood)}>
        <div className="w-48 aspect-[4/3] mb-5 mx-auto rounded-md text-center overflow-visible">
          <input type="file" className="hidden" ref={inputRef} onChange={onFileInputChange} />
          <button className="relative w-full h-full hover:brightness-105 transition-all duration-200" onClick={handleInputFile}>
            <div className="absolute -bottom-2 -right-2 p-2 bg-primary-deep rounded-full">
              <IconContext.Provider value={{ size: 16, color: "white" }}>
                <FaCamera />
              </IconContext.Provider>
            </div>
            {previewImage ? (
              <img src={previewImage} alt="" className="w-full h-full rounded-md object-cover" />
            ) : (
              selectFood.food_image && (
                <img src={selectFood.food_image.url} alt="" className="w-full h-full rounded-md object-cover" />
              )
            )}
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <InputField
            id="foodName"
            type="text"
            placeholder="例：チョコレート"
            fieldName="foodName"
            iconComponent={<BiSolidBowlRice />}
            labelName="食品名"
            validationRule={{
              required: "食品名を入力してください",
              maxLength: { value: 20, message: "食品名は20文字以内で入力してください" }
            }}
            columnName="name"
            handleOnChange={handleOnChange}
          />
          <InputField
            id="foodCalorie"
            type="text"
            placeholder="例：300"
            fieldName="foodCalorie"
            iconComponent={<FaFire />}
            labelName="食品のカロリー（kcal）"
            validationRule={{
              required: "カロリーを入力してください",
              min: { value: 1, message: "カロリーは1以上で入力してください" },
              max: { value: 9999, message: "カロリーは9999以下で入力してください" }
            }}
            columnName="calorie"
            handleOnChange={handleOnChange}
          />
          <SubmitButton className="w-full">更新</SubmitButton>
        </div>
      </form>
      <button
        onClick={() => closeModal()}
        className="absolute top-1 right-1 rounded-full transition-all duration-200 hover:bg-gray-200">
        <IconContext.Provider value={{ size: 30 }}>
          <IoIosClose />
        </IconContext.Provider>
      </button>
    </Modal>
  );
};
