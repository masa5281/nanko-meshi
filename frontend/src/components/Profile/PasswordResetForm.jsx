import { auth } from "../../config/firebase";
import { passwordResetNotify } from "../../utils/toastNotify";
import { CloseModalButton } from "../Button/CloseModalButton";
import { sendPasswordResetEmail } from "firebase/auth";
import { useAuth } from "../../context/AuthContext";

export const PasswordResetForm = ({
  setIsOpen,
  closeUserModal,
}) => {
  const { user } = useAuth();

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, user.email);
    setIsOpen(false);
    passwordResetNotify(<p>パスワード再設定用のメールを<br />送信しました。</p>);
  };

  return (
    <>
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
