// モジュール
import { auth } from "../../config/firebase";
// コンポーネント
import { CloseModalButton } from "../Button/CloseModalButton";
// ライブラリ
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
// カスタムフック
import { useAuth } from "../../context/AuthContext";

export const PasswordResetForm = ({
  setIsOpen,
  closeUserModal,
}) => {
  const { user } = useAuth();

  const passwordResetNotofy = () => toast.info(<p>パスワード再設定用のメールを<br />送信しました。</p>);

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, user.email);
    setIsOpen(false);
    passwordResetNotofy();
  };

  return (
    <>
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

      <CloseModalButton closeUserModal={closeUserModal} />
    </>
  );
};
