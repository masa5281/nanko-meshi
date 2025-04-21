// モジュール
import { useFormUtils } from "../../hooks/useFormUtils";
import { useFoodApi } from "../../hooks/useFoodApi";
import { VALIDATE_MESSAGES } from "../../utils/constants";
import { updateNotify } from "../../utils/toastNotify";
// コンポーネント
import { InputField } from "../InputField/InputField";
import { SubmitButton } from "../Button/SubmitButton";
import { IconProvider } from "../IconProvider";
// ライブラリ
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
// アイコン
import { FaCamera } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { BiSolidBowlRice } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
// カスタムフック
import { useValidateError } from "../../context/ValidateErrorContext";

export const FoodEditForm = ({
  selectFood,
  setSelectFood,
  setFoodList,
  closeFoodModal,
}) => {
  const { setValidateErrors } = useValidateError();
  const { handleSubmit } = useFormContext();
  const { updateFood } = useFoodApi();
  const inputRef = useRef(null);
  const {
    foodImage,
    previewImage,
    onFileInputChange,
    handleInputFile,
  } = useFormUtils();

  const handleUpdateFood = async () => {
    try {
      const response = await updateFood(selectFood, foodImage);
      setFoodList(prevFoodList =>
        prevFoodList.map(food => food.id === selectFood.id ? response : food)
      );
      closeFoodModal();
    } catch (error) {
      setValidateErrors(error.response.data);
    }
  };

  const handleOnChange = (e, columnName) => {
    setSelectFood(prev => ({ ...prev, [columnName]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit(handleUpdateFood)}>
      <div className="w-48 aspect-[4/3] mb-5 mx-auto rounded-md text-center overflow-visible">
        <input type="file" className="hidden" ref={inputRef} onChange={(e) => onFileInputChange(e, "food")} />
        <button
          className="relative w-full h-full hover:brightness-105 transition-all duration-200"
          onClick={(e) => handleInputFile(e, inputRef)}
        >
          <div className="absolute -bottom-2 -right-2 p-2 bg-primary-deep rounded-full">
            <IconProvider>
              <FaCamera size={16} color="#fff" />
            </IconProvider>
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
          validationRule={VALIDATE_MESSAGES.FOOD.NAME}
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
          validationRule={VALIDATE_MESSAGES.FOOD.CALORIE}
          columnName="calorie"
          handleOnChange={handleOnChange}
        />
        <SubmitButton
          className="w-full"
          onClick={() => updateNotify("食品を更新しました")}
        >
          更新
        </SubmitButton>
      </div>

      <button
        onClick={closeFoodModal}
        className="absolute top-1 right-1 rounded-full transition-all duration-200 hover:bg-gray-200"
      >
        <IconProvider size={30}>
          <IoIosClose />
        </IconProvider>
      </button>
    </form>
  );
};
