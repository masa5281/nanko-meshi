// モジュール
import { getUserApi, updateUserApi } from "../../api/userApi";
import { selectPlaceholder, setWeight } from "../../utils/formUtils";
import { useFormUtils } from "../../hooks/useFormUtils";
import { VALIDATE_MESSAGES } from "../../utils/constants";
import { updateNotify, verifyNotify } from "../../utils/toastNotify";
// コンポーネント
import { SubmitButton } from "../Button/SubmitButton";
import { InputField } from "../InputField/InputField";
import { IconProvider } from "../IconProvider";
import { CustomModal } from "../CustomModal";
import { PasswordAuthForm } from "./PasswordAuthForm";
// ライブラリ
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { verifyBeforeUpdateEmail } from "firebase/auth";
import { ErrorMessage } from "@hookform/error-message";
// アイコン
import { FaUser } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { GiWeightScale } from "react-icons/gi";
import { LuCameraOff } from "react-icons/lu";
import { FaCamera } from "react-icons/fa";
// カスタムフック
import { useUserDataContext } from "../../context/UserDataContext";
import { useAuth } from "../../context/AuthContext";
import { useValidateError } from "../../context/ValidateErrorContext";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";

export const ProfileForm = ({
  isOpen,
  isGoogleUser,
  modalType,
  openUserModal,
  closeUserModal,
}) => {
  const weights = setWeight();
  const [isTextPlaceholder, setIsTextPlaceholder] = useState(true);
  const { register, watch, handleSubmit, setError, formState: { errors } } = useFormContext();
  const inputRef = useRef(null);
  const { dbUserData, setDbUserData } = useUserDataContext();
  const { validateErrors, setValidateErrors } = useValidateError();
  const { user } = useAuth();
  const userName = watch("userName");
  const userEmail = watch("userEmail");
  const userWeight = watch("userWeight");
  const userPassword = watch("userPassword");
  const { emailAuth } = useFirebaseAuth();
  const {
    userImage,
    previewImage,
    onFileInputChange,
    handleInputFile,
  } = useFormUtils();

  useEffect(() => {
    selectPlaceholder(userWeight, setIsTextPlaceholder);
  }, [userWeight]);

  const handleUpdateUser = async () => {
    try {
      if (!isOpen && user.email !== userEmail) {
        openUserModal("passwordAuth");
        return;
      }
      await updateUserApi(
        userName,
        userWeight,
        userImage,
        user.uid
      );
      const updateUserData = await getUserApi(user.uid);
      setDbUserData(updateUserData);
      setValidateErrors([]);
      updateNotify("プロフィールを更新しました");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("userPassword", { type: "manual", message: "パスワードが違います" });
        return;
      }
      setValidateErrors(error.response.data);
    }
  };

  const verifyUpdateEmail = async () => {
    await emailAuth(userPassword);
    await verifyBeforeUpdateEmail(user, userEmail);
    closeUserModal();
    verifyNotify(<p>確認メールを送信しました。<br />リンクを開いて認証してください。</p>);
  };

  return (
    <>
      <CustomModal isOpen={isOpen && modalType === "passwordAuth"} title={<>本人確認のため<br />パスワードを入力してください</>}>
        <PasswordAuthForm verifyUpdateEmail={verifyUpdateEmail} closeUserModal={closeUserModal} />
      </CustomModal>

      <form onSubmit={handleSubmit(handleUpdateUser)} className="md:px-5">
        <div className="w-28 h-28 mb-4 mx-auto border-2 border-black rounded-full ring-1 ring-black text-center">
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={(e) => onFileInputChange(e, "user")}
          />
          <button
            className="w-full h-full relative bg-gray-100 rounded-full  transition-all duration-200 hover:brightness-110"
            onClick={(e) => handleInputFile(e, inputRef)}
          >
            <div className="absolute bottom-0 right-0 p-2 bg-primary-deep rounded-full">
              <IconProvider>
                <FaCamera size={16} color="#fff" />
              </IconProvider>
            </div>
            {dbUserData.avatar ? (
              userImage ? (
                <img src={previewImage} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <img src={dbUserData.avatar.url} alt="" className="w-full h-full rounded-full object-cover" />
              )
            ) : (
              <div className="w-full flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <IconProvider size={22}>
                  <LuCameraOff className="mb-1" />
                </IconProvider>
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
          validationRule={VALIDATE_MESSAGES.USER.NAME}
        />
        <InputField
          id="userEmail"
          type="text"
          placeholder="メールアドレスを入力してください"
          fieldName="userEmail"
          iconComponent={<IoMail />}
          labelName="メールアドレス"
          className={`mb-4 ${isGoogleUser ? "pointer-events-none" : ""}`}
          inputClassName={isGoogleUser ? "bg-gray-300" : ""}
          columnName="email"
          disabled={isGoogleUser ? true : false}
          validationRule={VALIDATE_MESSAGES.AUTH.EMAIL}
        />

        <div className="mb-6">
          <label htmlFor="userWeight" className="flex items-center pl-3 font-bold">
            <IconProvider size={20}>
              <div className="mr-0.5">
                <GiWeightScale />
              </div>
              体重
            </IconProvider>
          </label>
          <select
            id="userWeight"
            defaultValue=""
            className={`${isTextPlaceholder ? "placeholder" : ""} w-full border-black border-2 rounded-full indent-2 hover:cursor-pointer focus:ring-2 focus:ring-primary focus:border-primary`}
            {...register("userWeight", VALIDATE_MESSAGES.USER.WEIGHT)}
          >
            <option value="" disabled>体重を選択</option>
            {weights.map((weight) =>
              <option key={weight} value={weight}>{weight}</option>
            )}
          </select>
          <div className="relative"><span className="absolute bottom-3 right-10 pointer-events-none">kg</span></div>
          <ErrorMessage
            errors={errors}
            name="userWeight"
            render={({ message }) =>
              message ? (
                <p className="pl-2 text-error text-xs font-bold text-left">{message}</p>
              ) : null
            }
          />
          {validateErrors?.["weight"] && (
            validateErrors["weight"].map((error, index) =>
              error ? (
                <p key={index} className="pl-2 text-error text-xs font-bold text-left">{error}</p>
              ) : null
            )
          )}
        </div>

        <SubmitButton className="w-full">更新</SubmitButton>
      </form>
    </>
  );
};
