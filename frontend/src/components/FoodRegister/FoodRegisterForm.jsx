// モジュール
import { createFoodFormData } from "../../api/foodApi";
import { API_ENDPOINTS, ROUTES, VALIDATE_MESSAGES } from "../../utils/constants";
import { axiosClient } from "../../config/axiosClient";
import { useFormUtils } from "../../hooks/useFormUtils";
// コンポーネント
import { InputField } from "../InputField/InputField";
import { SubmitButton } from "../Button/SubmitButton";
import { IconProvider } from "../IconProvider";
// ライブラリ
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// アイコン
import { FaFire } from "react-icons/fa6";
import { BiSolidBowlRice } from "react-icons/bi";
import { LuCameraOff } from "react-icons/lu";
// カスタムフック
import { useValidateError } from "../../context/ValidateErrorContext";

export const FoodRegisterForm = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { setValidateErrors } = useValidateError();
  const [isLoading, setIsLoading] = useState(false);
  const {
    foodImage,
    previewImage,
    onFileInputChange,
    handleInputFile,
  } = useFormUtils();
  const { watch, handleSubmit } = useFormContext();
  const foodName = watch("foodName");
  const foodCalorie = watch("foodCalorie");

  const createFood = async () => {
    try {
      setIsLoading(true);
      const data = createFoodFormData(foodName, foodCalorie, foodImage);
      await axiosClient.post(API_ENDPOINTS.FOODS.BASE, data);
      navigate(ROUTES.FOODS.MY_REGISTERED);
    } catch (error) {
      setValidateErrors(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(createFood)} className="px-5 md:px-10">
      <div className="max-w-72 aspect-[4/3] mb-4 mx-auto border-2 border-black rounded-md ring-1 ring-black text-center overflow-hidden">
        <input type="file" className="hidden" ref={inputRef} onChange={(e) => onFileInputChange(e, "food")} />
        <button
          className="relative w-full h-full align-bottom bg-gray-100 transition-all duration-200"
          onClick={(e) => handleInputFile(e, inputRef)}
        >
          {foodImage ? (
            <img src={previewImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <IconProvider size={40}>
                <LuCameraOff className="mb-1" />
              </IconProvider>
              <span className="text-xl">NO IMAGE</span>
            </div>
          )}
        </button>
      </div>
      <InputField
        id="foodName"
        type="text"
        placeholder="例：チョコレート"
        fieldName="foodName"
        iconComponent={<BiSolidBowlRice />}
        labelName="食品名"
        className="mb-4"
        validationRule={VALIDATE_MESSAGES.FOOD.NAME}
        columnName="name"
      />
      <InputField
        id="foodCalorie"
        type="text"
        placeholder="例：300"
        fieldName="foodCalorie"
        iconComponent={<FaFire />}
        labelName="食品のカロリー（kcal）"
        className="mb-6"
        validationRule={VALIDATE_MESSAGES.FOOD.CALORIE}
        columnName="calorie"
      />
      <SubmitButton className="w-full" isLoading={isLoading}>登録</SubmitButton>
    </form>
  );
};
