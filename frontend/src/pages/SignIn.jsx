// モジュール
import { ROUTES } from "../utils/constants";
// コンポーネント
import { AuthInputField } from "../components/InputField/AuthInputField"
import { AuthSubmitButton } from "../components/Button/AuthSubmitButton"
import { GoogleButton } from "../components/Button/GoogleButton";
// ライブラリ
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
// アイコン
import { IoMail } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";
// カスタムフック
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { useUserDataContext } from "../context/UserDataContext";

export const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { watch, handleSubmit } = methods;
  const { signIn, signInGoogle } = useFirebaseAuth();
  const { setDbUserData } = useUserDataContext();

  const handleSignIn = async () => {
    try {
      const dbUser = await signIn(watch("email"), watch("password"));
      setDbUserData(dbUser);
      navigate(ROUTES.CALORIE.INPUT);
    } catch {
      setErrorMessage("メールアドレスまたはパスワードが違います");
    }
  };

  const handleSignInGoogle = async () => {
    try {
      const dbUser = await signInGoogle();
      setDbUserData(dbUser);
      navigate(ROUTES.CALORIE.INPUT);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-12">
      <div className="max-w-80 md:max-w-96 mx-auto px-3 md:px-10 py-6 bg-header rounded-md shadow-md shadow-shadow">
        <h2 className="mb-5 pb-2 border-b border-white text-white text-3xl text-center">ログイン</h2>
        <div className="px-3">
          <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col mb-4">
            {errorMessage && <p className="mb-3 text-errorYellow text-sm">{errorMessage}</p>}
            <FormProvider {...methods}>
              <AuthInputField
                type="email"
                placeholder="メールアドレス"
                fieldName="email"
                validationRule={{
                  required: "メールアドレスを入力してください"
                }}
                iconComponent={<IoMail />}
              />
              <AuthInputField
                type="password"
                placeholder="パスワード"
                fieldName="password"
                validationRule={{
                  required: "パスワードを入力してください"
                }}
                iconComponent={<IoMdLock />}
              />
            </FormProvider>
            <AuthSubmitButton>ログイン</AuthSubmitButton>
          </form>
          <div className="mb-5 text-center">
            <Link to={ROUTES.AUTH.PASSWORD_RESET} className="inline-flex mb-1 text-white hover:underline">パスワードをお忘れの方はこちら</Link>
            <Link to={ROUTES.AUTH.SIGN_UP} className="inline-flex text-white hover:underline">新規登録の方はこちら</Link>
          </div>
          <GoogleButton handleSignInGoogle={handleSignInGoogle}>Googleでログイン</GoogleButton>
        </div>
      </div>
    </div>
  );
};
