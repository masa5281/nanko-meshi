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
      <h3 className="inline-block w-full mb-4 pb-2 text-2xl text-black font-bold">
        本人確認のため<br />
        パスワードを入力してください
      </h3>
      <InputField
        id="userPassword"
        type="password"
        placeholder="パスワードを入力してください"
        fieldName="userPassword"
        iconComponent={<IoMdLock />}
        labelName="パスワード"
        className="mb-4"
        validationRule={{
          required: "パスワードを入力してください",
          minLength: { value: 6, message: "パスワードは6文字以上で入力してください" }
        }}
      />
      <SubmitButton className={"w-full"}>更新</SubmitButton>

      <CloseModalButton closeUserModal={closeUserModal} />
    </form>
  );
};
