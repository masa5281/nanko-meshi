// モジュール
import { deleteUserApi } from "../../api/userApi";
// ライブラリ
import { motion } from "motion/react";
import Modal from 'react-modal';
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
// コンポーネント
import { InputField } from "../InputField/InputField";
// アイコン
import { IoMdLock } from "react-icons/io";
// モーダルのスタイル
import { modalStyle } from "../../theme/modalStyle";
// カスタムフック
import { useFormContext } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

export const DeleteAccountButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { watch, handleSubmit } = useFormContext();
  const { user } = useAuth();
  const userPassword = watch("userPassword");

  const openModal = () => {
    setIsOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        userPassword,
      );
      await reauthenticateWithCredential(user, credential);
      await deleteUserApi(user.uid);
      await deleteUser(user);
      deleteUserNotofy();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUserNotofy = () => {
    toast.success("ユーザーを削除しました", {
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
        <h3 className="inline-block w-full mb-3 text-2xl text-black font-bold">退会</h3>
        <p className="mb-3">
          アカウント削除後は復元できません。<br />よろしければパスワード入力後に<br />削除を実行してください。
        </p>
        <form onSubmit={handleSubmit(handleDeleteUser)}>
          <InputField
            id="userPassword"
            type="password"
            placeholder="パスワードを入力してください"
            fieldName="userPassword"
            iconComponent={<IoMdLock />}
            labelName="パスワード"
            className="mb-4"
          />
          <button
            type="submit"
            className="w-full inline-block relative mx-auto px-[54px] py-2 border-black border-2 rounded-full bg-delete text-white font-bold hover:brightness-110"
          >
            アカウントを削除
          </button>
        </form>
      </Modal>

      <button
        className="px-2 py-1 text-white bg-delete rounded-md hover:brightness-105"
        onClick={openModal}
      >
        退会のお手続き
      </button>
    </>
  );
};
