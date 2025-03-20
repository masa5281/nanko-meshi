import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";

export const useFormUtils = () => {
  const { setValue } = useFormContext();

  const [foodImage, setFoodImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  
  // 入力値を全角→半角変換
  const onChangeToText = (e, fieldName) => {
    const inputText = e.target.value;
    const toHalfWidth = inputText.replace(/[０-９]/g, (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0));
    setValue(fieldName, toHalfWidth, { shouldValidate: true });
  };

  // ファイル選択後、画像をプレビュー用とアップロード用に保存
  const onFileInputChange = (e) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0];
    setPreviewImage(URL.createObjectURL(fileObject));
    setFoodImage(fileObject);
  };

  return {
    foodImage,
    previewImage,
    methods,
    onChangeToText,
    onFileInputChange
  };
};
