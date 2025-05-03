// モジュール
import { provider } from "../../config/firebase";
import { VALIDATE_MESSAGES } from "../../utils/constants";
import { deleteNotify } from "../../utils/toastNotify";
// コンポーネント
import { InputField } from "../InputField/InputField";
import { CloseModalButton } from "../Button/CloseModalButton";
// ライブラリ
import { reauthenticateWithPopup } from "firebase/auth";
// アイコン
import { IoMdLock } from "react-icons/io";
// カスタムフック
import { useFormContext } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useFirebaseAuth } from "../../hooks/useFirebaseAuth";

export const DeleteAccountForm = ({
  setIsOpen,
  isGoogleUser,
  closeUserModal,
}) => {
  const { watch, handleSubmit, setError } = useFormContext();
  const { user } = useAuth();
  const userPassword = watch("userPassword");
  const { emailAuth, deleteAccount } = useFirebaseAuth();

  const handleDeleteUser = async () => {
    try {
      // ログイン方式別の再認証
      if (isGoogleUser) {
        await reauthenticateWithPopup(user, provider);
      } else {
        await emailAuth(userPassword);
      }
      await deleteAccount(user.uid);
      setIsOpen(false);
      deleteNotify("退会が完了しました");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("userPassword", { type: "manual", message: "パスワードが違います" });
        return;
      }
    }
  };

  return (
    <>
      {isGoogleUser ? (
        <>
          <p className="text-xs md:text-base mb-3">アカウント削除後は復元できません。<br />再ログイン後にアカウントが削除されます。</p>
          <button
            className="w-full inline-block relative mx-auto px-[54px] py-2 border-black border-2 rounded-full bg-delete text-white font-bold hover:brightness-110"
            onClick={handleDeleteUser}
          >
            アカウントを削除
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit(handleDeleteUser)}>
          <p className="mb-3">アカウント削除後は復元できません。<br />よろしければパスワード入力後に<br />削除を実行してください。</p>
          <InputField
            id="userPassword"
            type="password"
            placeholder="パスワードを入力してください"
            fieldName="userPassword"
            iconComponent={<IoMdLock />}
            labelName="パスワード"
            className="mb-4"
            validationRule={VALIDATE_MESSAGES.AUTH.PASSWORD}
          />
          <button
            type="submit"
            className="w-full inline-block relative mx-auto px-[54px] py-2 border-black border-2 rounded-full bg-delete text-white font-bold hover:brightness-110"
          >
            アカウントを削除
          </button>
        </form>
      )}
      <CloseModalButton closeUserModal={closeUserModal} />
    </>
  );
};
