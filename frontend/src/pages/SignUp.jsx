// モジュール
import { ROUTES, VALIDATE_MESSAGES } from "../utils/constants";
// コンポーネント
import { AuthInputField } from "../components/InputField/AuthInputField"
import { AuthSubmitButton } from "../components/Button/AuthSubmitButton"
import { GoogleButton } from "../components/Button/GoogleButton";
// ライブラリ
import { useForm, FormProvider } from "react-hook-form"
import { useNavigate } from "react-router-dom";
// アイコン
import { FaUser } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
// カスタムフック
import { useValidateError } from "../context/ValidateErrorContext";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { useUserDataContext } from "../context/UserDataContext";

export const SignUp = () => {
  const navigate = useNavigate();
  const { setValidateErrors } = useValidateError();
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { watch, setError, handleSubmit, getValues } = methods;
  const { signUp, signInGoogle } = useFirebaseAuth();
  const { setDbUserData } = useUserDataContext();

  const handleSignUp = async () => {
    try {
      const dbUser = await signUp(watch("email"), watch("password"), watch("userName"));
      setDbUserData(dbUser);
      navigate(ROUTES.AUTH.WEIGHT);
    } catch (error) {
      firebaseErrorMessage(error.code);
      if (error.response) setValidateErrors(error.response.data);
    }
  };

  const handleSignInGoogle = async () => {
    try {
      const dbUser = await signInGoogle();
      setDbUserData(dbUser);
      navigate(ROUTES.AUTH.WEIGHT);
    } catch (error) {
      console.error(error);
    }
  };

  const firebaseErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        setError("email", { type: "manual", message: "有効なメールアドレスを入力してください" })
        break;
      case "auth/email-already-in-use":
        setError("email", { type: "manual", message: "既に登録済みのメールアドレスです" })
        break;
      case "auth/missing-password":
        setError("password", { type: "manual", message: "パスワードを入力してください" })
        break;
      case "auth/weak-password":
        setError("password", { type: "manual", message: "パスワードは6文字以上で入力してください" })
        break;
      default:
    }
  };

  return (
    <div className="pt-12">
      <div className="max-w-80 md:max-w-96 mx-auto px-3 md:px-10 py-6 bg-header rounded-md shadow-md shadow-shadow">
        <h2 className="mb-5 pb-2 border-b border-white text-white text-3xl text-center">新規登録</h2>
        <div className="px-3">
          <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col mb-4">
            <FormProvider {...methods}>
              <AuthInputField
                type="text"
                placeholder="ユーザー名"
                fieldName="userName"
                validationRule={VALIDATE_MESSAGES.USER.NAME}
                iconComponent={<FaUser />}
              />
              <AuthInputField
                type="email"
                placeholder="メールアドレス"
                fieldName="email"
                validationRule={VALIDATE_MESSAGES.AUTH.EMAIL}
                iconComponent={<IoMail />}
              />
              <AuthInputField
                type="password"
                placeholder="パスワード"
                fieldName="password"
                validationRule={VALIDATE_MESSAGES.AUTH.PASSWORD}
                iconComponent={<IoMdLock />}
              />
              <AuthInputField
                type="password"
                placeholder="パスワード（確認）"
                fieldName="passwordConfirm"
                validationRule={{
                  required: "パスワード（確認用）を入力してください",
                  validate: (value) => value === getValues("password") || "パスワードが一致しません"
                }}
                iconComponent={<IoMdLock />}
              />
            </FormProvider>
            <AuthSubmitButton>新規登録</AuthSubmitButton>
          </form>
          <GoogleButton handleSignInGoogle={handleSignInGoogle}>Googleで登録</GoogleButton>
        </div>
      </div>
    </div>
  );
}
