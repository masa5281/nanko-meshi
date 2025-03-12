// モジュール
import { auth } from "../config/firebase";
import { ROUTES } from "../utils/constants";
// コンポーネント
import { AuthInputField } from "../components/InputField/AuthInputField"
import { AuthSubmitButton } from "../components/Button/AuthSubmitButton"
// ライブラリ
import { sendPasswordResetEmail } from "firebase/auth"
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// アイコン
import { IoMail } from "react-icons/io5";

export const PasswordResetForm = () => {
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { watch, handleSubmit } = methods;

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, watch("email"));
    navigate(ROUTES.AUTH.PASSWORD_SENT);
  }

  return (
    <div className="pt-12">
      <div className="max-w-md mx-auto px-10 py-6 bg-header rounded-md shadow-md shadow-shadow">
        <h2 className="mb-5 pb-2 border-b border-white text-white text-3xl text-center">パスワード再設定</h2>
        <div className="px-3">
          <p className="mb-3 text-white tracking-tight">
            登録済みのメールアドレスを入力してください。
            パスワード再設定のURLをメールで送信します。
          </p>

          <form onSubmit={handleSubmit(handlePasswordReset)}>
            <FormProvider {...methods}>
              <AuthInputField
                type="email"
                placeholder="メールアドレス"
                fieldName="email"
                validationRule={{
                  required: "メールアドレスを入力してください",
                  pattern: {
                    value: /^[a-zA-Z0-9_.-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                    message: "有効なメールアドレスを入力してください"
                  }
                }}
                iconComponent={<IoMail />}
              />
            </FormProvider>
            <AuthSubmitButton className="w-full">
              パスワード再設定メールを送信
            </AuthSubmitButton>
          </form>
          
        </div>
      </div>
    </div>
  )
}
