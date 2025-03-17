// モジュール
import { createFoodApi } from "../../api/foodApi";
import { API_ENDPOINTS } from "../../utils/constants";
import { axiosClient } from "../../config/axiosClient";
// コンポーネント
import { InputField } from "../InputField/InputField";
import { SubmitButton } from "../Button/SubmitButton";
// ライブラリ
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons/lib";
// アイコン
import { FaFire } from "react-icons/fa6";
import { BiSolidBowlRice } from "react-icons/bi";
import { LuCameraOff } from "react-icons/lu";
// カスタムフック
import { useValidateError } from "../../context/ValidateErrorContext";

export const FoodRegisterForm = () => {
  const [foodImage, setFoodImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { setValidateErrors } = useValidateError();

  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { watch, handleSubmit, setValue } = methods;

  // ボタン押下でinputが発火
  const handleInputFile = (e) => {
    e.preventDefault();
    inputRef.current.click();
  }

  // ファイル選択後、画像をプレビュー用とアップロード用に保存
  const onFileInputChange = (e) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];
    setPreviewImage(URL.createObjectURL(fileObject));
    setFoodImage(fileObject);
  };

  const createFood = async () => {
    try {
      const data = createFoodApi(watch("foodName"), watch("foodCalorie"), foodImage);
      await axiosClient.post(API_ENDPOINTS.FOODS.BASE, data);
      navigate("/");
    } catch (error) {
      setValidateErrors(error.response.data);
    }
  };

  const onChangeToText = (e) => {
    const inputText = e.target.value;
    const toHalfWidth = inputText.replace(/[０-９]/g, (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0));
    setValue("foodCalorie", toHalfWidth, { shouldValidate: true });
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(createFood)} className="px-10">
        <div className="w-64 aspect-[4/3] mb-4 mx-auto border-2 border-black rounded-md ring-1 ring-black text-center overflow-hidden">
          <input type="file" className="hidden" ref={inputRef} onChange={onFileInputChange} />
          <button className="relative w-full h-full bg-gray-100 hover:brightness-110 transition-all duration-200" onClick={handleInputFile}>
            {foodImage ? (
              <img src={previewImage} alt="" className="w-full h-full" />
            ) : (
              <div className="flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <IconContext.Provider value={{ size: 40 }}>
                  <LuCameraOff className="mb-1" />
                </IconContext.Provider>
                <span className="text-xl">NO IMAGE</span>
              </div>
            )
            }
          </button>
        </div>

        <InputField
          id="foodName"
          type="text"
          placeholder="例：チョコレート"
          fieldName="foodName"
          iconComponent={<BiSolidBowlRice className="mr-0.5" />}
          labelName="食品名"
          className="mb-4"
          validationRule={{
            required: "食品名を入力してください",
            maxLength: { value: 20, message: "食品名は20文字以内で入力してください" }
          }}
          columnName="name"
        />

        <InputField
          id="foodCalorie"
          type="text"
          placeholder="例：300"
          fieldName="foodCalorie"
          iconComponent={<FaFire className="mr-0.5" />}
          labelName="食品のカロリー（kcal）"
          className="mb-6"
          validationRule={{
            required: "カロリーを入力してください",
            min: { value: 1, message: "カロリーは1以上で入力してください" },
            max: { value: 9999, message: "カロリーは9999以下で入力してください" }
          }}
          columnName="calorie"
          onChange={onChangeToText}
        />

        <SubmitButton className="w-full">
          登録
        </SubmitButton>
      </form>
    </FormProvider>
  );
};
