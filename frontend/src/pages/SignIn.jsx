// モジュール
import { createUserApi } from "../api/userApi";
import { auth, signIn, provider } from "../config/firebase";
import { ROUTES } from "../utils/constants";
// コンポーネント
import { InputField } from "../components/Auth/InputField";
import { AuthButton } from "../components/Auth/AuthButton";
import { GoogleButton } from "../components/Auth/GoogleButton";
// ライブラリ
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
// アイコン
import { IoMail } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";

export const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { watch, handleSubmit } = methods;

  // ログイン（メアド、パスワード）
  const handleSignIn = async (e) => {
    try {
      await signIn(watch("email"), watch("password"));
      navigate(ROUTES.CALORIE.INPUT);
    } catch (error) {
      setErrorMessage("メールアドレスまたはパスワードが違います");
    }
  };

  // ログイン（Google）
  const handleSignInGoogle = async () => {
    try {
      const googleUser = await signInWithPopup(auth, provider);
      createUserApi(googleUser.user.uid, googleUser.user.displayName);
      navigate(ROUTES.CALORIE.INPUT);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-12">
      <div className="max-w-96 mx-auto px-10 py-6 bg-header rounded-md shadow-md shadow-shadow">
        <h2 className="mb-5 pb-2 border-b border-white text-white text-3xl text-center">ログイン</h2>
        <div className="px-3">
          <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col mb-4">
            {errorMessage && <p className="mb-3 text-errorYellow text-sm">{errorMessage}</p>}
            <FormProvider {...methods}>
              <InputField
                type="email"
                placeholder="メールアドレス"
                fieldName="email"
                validationRule={{
                  required: "メールアドレスを入力してください"
                }}
                iconComponent={<IoMail />}
              />
              <InputField
                type="password"
                placeholder="パスワード"
                fieldName="password"
                validationRule={{
                  required: "パスワードを入力してください"
                }}
                iconComponent={<IoMdLock />}
              />
            </FormProvider>
            <AuthButton>ログイン</AuthButton>
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
}
