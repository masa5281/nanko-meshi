// モジュール
import { auth } from "../../config/firebase";
// ライブラリ
import { motion } from "motion/react";
import Modal from 'react-modal';
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
// モーダルのスタイル
import { modalStyle } from "../../theme/modalStyle";
// カスタムフック
import { useAuth } from "../../context/AuthContext";

export const PasswordResetButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const openModal = () => {
    setIsOpen(true);
  }

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, user.email);
    setIsOpen(false);
    passwordResetNotofy();
  }

  const passwordResetNotofy = () => {
    toast.info(<p>パスワード再設定用のメールを<br />送信しました。</p>, {
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
        <h3 className="inline-block w-full mb-3 text-2xl text-black font-bold">パスワード再設定</h3>
        <p className="mb-3">
          登録済みのメールアドレスに<br />
          パスワード再設定のURLを送信します。
        </p>
        <button
          className="inline-block relative mx-auto px-[54px] py-2 border-black border-2 rounded-full bg-primary text-white font-bold hover:bg-hover"
          onClick={handlePasswordReset}>
          パスワード再設定メールを送信
        </button>
      </Modal>

      <button
        className="px-2 py-1 text-white bg-black rounded-md hover:brightness-125"
        onClick={openModal}
      >
        パスワード再設定
      </button>
    </>
  );
};
