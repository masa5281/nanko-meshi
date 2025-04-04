// コンポーネント
import { SubmitButton } from "../Button/SubmitButton";
import { InputField } from "../InputField/InputField";
import { IconProvider } from "../IconProvider";
// ライブラリ
import { useFormContext } from "react-hook-form";
// アイコン
import { IoMdLock } from "react-icons/io";
import { IoIosClose } from "react-icons/io";

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

      <button
        onClick={closeUserModal}
        className="absolute top-1 right-1 rounded-full transition-all duration-200 hover:bg-gray-200"
      >
        <IconProvider size={30}>
          <IoIosClose />
        </IconProvider>
      </button>
    </form>
  );
};
