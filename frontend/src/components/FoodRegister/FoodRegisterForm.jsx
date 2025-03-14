// モジュール
import { createFoodApi } from "../../api/foodApi";
// コンポーネント
import { InputField } from "../InputField/InputField";
import { SubmitButton } from "../Button/SubmitButton";
// ライブラリ
import { createContext, useContext, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
// アイコン
import { FaFire } from "react-icons/fa6";
import { BiSolidBowlRice } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/constants";
import { axiosClient } from "../../config/axiosClient";

const ValidateErrorContext = createContext();
export const useValidateError = () => useContext(ValidateErrorContext);

export const FoodRegisterForm = () => {
  const [validateErrors, setValidateErrors] = useState([]);
  const [foodImage, setFoodImage] = useState();
  const [previewImage, setPreviewImage] = useState();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { watch, handleSubmit } = methods;

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
      const data = createFoodApi(watch("name"), watch("calorie"), foodImage);
      await axiosClient.post(API_ENDPOINTS.FOODS.BASE, data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <ValidateErrorContext.Provider value={validateErrors}>
        <form onSubmit={handleSubmit(createFood)} className="">
          <div>
            <img src={previewImage} alt="" />
            <input type="file" ref={inputRef} onChange={onFileInputChange} className="hidden" />
            <button onClick={handleInputFile}>画像を選択</button>
          </div>
          <InputField
            id="name"
            type="text"
            placeholder="例：チョコレート"
            fieldName="name"
            iconComponent={<BiSolidBowlRice className="mr-0.5" />}
            labelName="食品名"
          />
          <InputField
            id="calorie"
            type="text"
            placeholder="例：300"
            fieldName="calorie"
            iconComponent={<FaFire className="mr-0.5" />}
            labelName="食品のカロリー（kcal）"
          />
          <SubmitButton className="w-full">
            登録
          </SubmitButton>
        </form>
      </ValidateErrorContext.Provider>
    </FormProvider>
  );
};
