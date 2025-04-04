import { useState } from "react";

export const useFormUtils = () => {
  const [foodImage, setFoodImage] = useState("");
  const [userImage, setUserImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // ファイル選択後、画像をプレビュー用とアップロード用に保存
  const onFileInputChange = (e, imageType) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0];
    setPreviewImage(URL.createObjectURL(fileObject));
    if (imageType === "food") {
      setFoodImage(fileObject);
    } else if (imageType === "user") {
      setUserImage(fileObject);
    }
  };

  return {
    foodImage,
    userImage,
    previewImage,
    onFileInputChange,
  };
};
