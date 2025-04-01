// コンポーネント
import { SubmitButton } from "../Button/SubmitButton";
import { InputField } from "../InputField/InputField";
import { IconWrapper } from "../IconWrapper";
// ライブラリ
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
// アイコン
import { FaUser } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { GiWeightScale } from "react-icons/gi";
import { LuCameraOff } from "react-icons/lu";
import { FaCamera } from "react-icons/fa";
// カスタムフック
import { useUserDataContext } from "../../context/UserDataContext";
import { useAuth } from "../../context/AuthContext";

export const ProfileForm = () => {
  const { reset, watch, handleSubmit } = useFormContext();
  const inputRef = useRef(null);
  const [userImage, setUserImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const { dbUserData, setDbUserData } = useUserDataContext();
  const { user } = useAuth();

  // ファイル選択後、画像をプレビュー用とアップロード用に保存
  const onFileInputChange = (e) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0];
    setPreviewImage(URL.createObjectURL(fileObject));
    setUserImage(fileObject);
  };

  // ボタン押下でinputが発火
  const handleInputFile = (e) => {
    e.preventDefault();
    inputRef.current.click();
  }

  // const handleOnChange = (e, columnName) => {
  //   setDbUserData(prev => ({ ...prev, [columnName]: e.target.value }));
  // };

  return (
    <form onSubmit={handleSubmit()} className="px-10">
      <div className="w-28 h-28 mb-4 mx-auto border-2 border-black rounded-full ring-1 ring-black text-center">
        <input type="file" className="hidden" ref={inputRef} onChange={onFileInputChange} />
        <button
          className="w-full h-full relative bg-gray-100 rounded-full hover:brightness-110 transition-all duration-200"
          onClick={handleInputFile}
        >
          <div className="absolute bottom-0 right-0 p-2 bg-primary-deep rounded-full">
            <IconWrapper>
              <FaCamera size={16} color="#fff" />
            </IconWrapper>
          </div>
          {userImage ? (
            <img src={previewImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <IconWrapper size={22}>
                <LuCameraOff className="mb-1" />
              </IconWrapper>
              <span className="text-sm">NO IMAGE</span>
            </div>
          )}
        </button>
      </div>
      <InputField
        id="userName"
        type="text"
        placeholder="ユーザー名を入力してください"
        fieldName="userName"
        iconComponent={<FaUser />}
        labelName="ユーザー名"
        className="mb-4"
        columnName="name"
      />
      <InputField
        id="userEmail"
        type="text"
        placeholder="メールアドレスを入力してください"
        fieldName="userEmail"
        iconComponent={<IoMail />}
        labelName="メールアドレス"
        className="mb-4"
        columnName="email"
      />
      <InputField
        id="userWeight"
        type="text"
        placeholder="体重を入力してください"
        fieldName="userWeight"
        iconComponent={<GiWeightScale />}
        labelName="体重"
        className="mb-4"
        columnName="weight"
      />
      <SubmitButton className="w-full">更新</SubmitButton>
    </form>
  );
};
