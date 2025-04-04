// モジュール
import { VALIDATE_MESSAGES } from "../../utils/constants";
// コンポーネント
import { SubmitButton } from "../Button/SubmitButton";
import { InputField } from "../InputField/InputField";
import { CloseModalButton } from "../Button/CloseModalButton";
// ライブラリ
import { useFormContext } from "react-hook-form";
// アイコン
import { IoMdLock } from "react-icons/io";

export const PasswordAuthForm = ({
  handleUpdateUser,
  closeUserModal,
}) => {
  const { handleSubmit } = useFormContext();

  return (
    <form onSubmit={handleSubmit(handleUpdateUser)}>
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
      <SubmitButton className={"w-full"}>更新</SubmitButton>

      <CloseModalButton closeUserModal={closeUserModal} />
    </form>
  );
};
