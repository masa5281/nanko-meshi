// モジュール
import { getUserApi, updateUserApi } from "../../api/userApi";
import { selectPlaceholder, setWeight } from "../../utils/formUtils";
// コンポーネント
import { SubmitButton } from "../Button/SubmitButton";
import { InputField } from "../InputField/InputField";
import { IconWrapper } from "../IconWrapper";
// ライブラリ
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { EmailAuthProvider, reauthenticateWithCredential, verifyBeforeUpdateEmail } from "firebase/auth";
import { motion } from "motion/react";
import Modal from 'react-modal';
import { toast } from 'react-toastify';
// アイコン
import { FaUser } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { GiWeightScale } from "react-icons/gi";
import { LuCameraOff } from "react-icons/lu";
import { FaCamera } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
// カスタムフック
import { useUserDataContext } from "../../context/UserDataContext";
import { useAuth } from "../../context/AuthContext";
// モーダルのスタイル
import { modalStyle } from "../../theme/modalStyle";

export const ProfileForm = () => {
  const [isTextPlaceholder, setIsTextPlaceholder] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const { register, watch, handleSubmit } = useFormContext();
  const inputRef = useRef(null);
  const { dbUserData, setDbUserData } = useUserDataContext();
  const { user } = useAuth();
  const userName = watch("userName");
  const userEmail = watch("userEmail");
  const userWeight = watch("userWeight");
  const userPassword = watch("userPassword");
  const weights = setWeight();

  useEffect(() => {
    selectPlaceholder(userWeight, setIsTextPlaceholder);
  }, [userWeight]);

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

  const handleUpdateUser = async () => {
    try {
      if (!isOpen && user.email !== userEmail) {
        setIsOpen(true);
        return;
      }
      if (isOpen) {
        const credential = EmailAuthProvider.credential(
          user.email,
          userPassword,
        );
        await reauthenticateWithCredential(user, credential);
        await verifyBeforeUpdateEmail(user, userEmail);
        setIsOpen(false);
        console.log("途中");
      }

      await updateUserApi(
        userName,
        userWeight,
        userImage,
        user.uid
      );
      const updateUserData = await getUserApi(user.uid);
      setDbUserData(updateUserData);
      console.log("最後");
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserNotofy = () => {
    if (user.email !== userEmail) return;

    toast.success("プロフィールを更新しました", {
      position: "top-center",
      hideProgressBar: true,
      theme: "colored",
      autoClose: 4000,
    });
  };

  const verifyUserNotofy = () => {
    toast.info(<p>確認メールを送信しました。<br />リンクを開いて認証してください。</p>, {
      position: "top-center",
      hideProgressBar: true,
      theme: "colored",
      autoClose: 4000,
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        style={modalStyle}
        bodyOpenClassName="modal--open"
        contentElement={(props, children) => (
          <motion.div
            {...props}
            initial={{ opacity: 0.5, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      >
        <h3 className="inline-block w-full mb-4 pb-2 text-2xl text-black font-bold">本人確認のため<br />パスワードを入力してください</h3>
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <InputField
            id="userPassword"
            type="password"
            placeholder="パスワードを入力してください"
            fieldName="userPassword"
            iconComponent={<IoMdLock />}
            labelName="パスワード"
            className="mb-4"
          />
          <SubmitButton className={"w-full"} notifyClick={verifyUserNotofy}>更新</SubmitButton>
        </form>
      </Modal>

      <form onSubmit={handleSubmit(handleUpdateUser)} className="px-5">
        <div className="w-28 h-28 mb-4 mx-auto border-2 border-black rounded-full ring-1 ring-black text-center">
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={onFileInputChange}
          />
          <button
            className="w-full h-full relative bg-gray-100 rounded-full  transition-all duration-200 hover:brightness-110"
            onClick={handleInputFile}
          >
            <div className="absolute bottom-0 right-0 p-2 bg-primary-deep rounded-full">
              <IconWrapper>
                <FaCamera size={16} color="#fff" />
              </IconWrapper>
            </div>
            {dbUserData.avatar ? (
              userImage ? (
                <img src={previewImage} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <img src={dbUserData.avatar.url} alt="" className="w-full h-full rounded-full object-cover" />
              )
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
        {user.providerData[0].providerId === "google.com" ? (
          <InputField
            id="userEmail"
            type="text"
            placeholder="メールアドレスを入力してください"
            fieldName="userEmail"
            iconComponent={<IoMail />}
            labelName="メールアドレス"
            className="mb-4 pointer-events-none"
            inputClassName="bg-gray-300"
            columnName="email"
            disabled={true}
          />
        ) : (
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
        )}
        <div className="relative mb-6">
          <label htmlFor="userWeight" className="flex items-center pl-3 font-bold">
            <IconWrapper size={20}>
              <div className="mr-0.5">
                <GiWeightScale />
              </div>
              体重
            </IconWrapper>
          </label>
          <select
            id="userWeight"
            defaultValue=""
            className={`${isTextPlaceholder ? "placeholder" : ""} w-full border-black border-2 rounded-full indent-2 focus:ring-2 focus:ring-primary focus:border-primary`}
            {...register("userWeight", {
              required: "体重を選択してください"
            })}
          >
            <option value="" disabled>体重を選択</option>
            {weights.map((weight) =>
              <option key={weight} value={weight}>{weight}</option>
            )}
          </select>
          <span className="absolute bottom-3 right-10 pointer-events-none">kg</span>
        </div>

        <SubmitButton className="w-full" notifyClick={updateUserNotofy}>更新</SubmitButton>
      </form>
    </>
  );
};
