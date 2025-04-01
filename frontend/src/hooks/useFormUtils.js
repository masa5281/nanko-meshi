import { useState } from "react";

export const useFormUtils = () => {
  const [foodImage, setFoodImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

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
    onFileInputChange,
  };
};
