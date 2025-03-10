// モジュール
import { createUserApi } from "../api/userApi";
import { signUp } from "../firebase/firebase";
import { ROUTES } from "../utils/constants";
// コンポーネント
import { InputField } from "./InputField";
import { AuthButton } from "./AuthButton";
import { GoogleButton } from "./GoogleButton";
// ライブラリ
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useForm, FormProvider } from "react-hook-form"
import { createContext, useContext, useState } from "react";
// アイコン
import { FaUser } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";

// validateErrorsのコンテキスト
const ValidateErrorContext = createContext();
export const useValidateError = () => useContext(ValidateErrorContext);

export const SignUp = () => {
  const navigate = useNavigate();
  const [validateErrors, setValidateErrors] = useState("");

  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { watch, setError, handleSubmit, getValues } = methods;

  // ユーザー登録（メアド、パスワード）
  const handleSignUp = async () => {
    try {
      const emailUser = await signUp(watch("email"), watch("password"));
      createUserApi(emailUser.user.uid, watch("name"));
      navigate(ROUTES.CALORIE.INPUT);
    } catch (error) {
      firebaseErrorMessage(error);
      if (error.response) setValidateErrors(error.response.data);
    }
  };

  // ユーザー登録（Google）
  const handleSignInGoogle = async () => {
    try {
      const googleUser = await signInWithPopup(auth, provider);
      createUserApi(googleUser.user.uid, googleUser.user.displayName);
      navigate(ROUTES.CALORIE.INPUT);
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
      <div className="max-w-96 mx-auto px-10 py-6 bg-header rounded-md shadow-md shadow-shadow">
        <h2 className="mb-5 pb-2 border-b border-white text-white text-3xl text-center">新規登録</h2>
        <div className="px-3">
          <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col mb-4">
            <FormProvider {...methods}>
              <ValidateErrorContext.Provider value={validateErrors} >
                <InputField
                  type="text"
                  placeholder="ユーザー名"
                  fieldName="name"
                  validationRule={{
                    required: "ユーザー名を入力してください",
                    maxLength: { value: 20, message: "ユーザー名は20文字以内で入力してください" }
                  }}
                  iconComponent={<FaUser />}
                />
                <InputField
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
                <InputField
                  type="password"
                  placeholder="パスワード"
                  fieldName="password"
                  validationRule={{
                    required: "パスワードを入力してください",
                    minLength: { value: 6, message: "パスワードは6文字以上で入力してください" }
                  }}
                  iconComponent={<IoMdLock />}
                />
                <InputField
                  type="password"
                  placeholder="パスワード（確認）"
                  fieldName="password_confirm"
                  validationRule={{
                    required: "パスワード（確認用）を入力してください",
                    validate: (value) => value === getValues("password") || "パスワードが一致しません"
                  }}
                  iconComponent={<IoMdLock />}
                />
              </ValidateErrorContext.Provider>
            </FormProvider>
            <AuthButton>新規登録</AuthButton>
          </form>
          <GoogleButton handleSignInGoogle={handleSignInGoogle}>Googleで登録</GoogleButton>
        </div>
      </div>
    </div>
  );
}
