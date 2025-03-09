// コンポーネント
import { signUp } from "../firebase/firebase";
import { api } from "../api";
import { InputField } from "./InputField";
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
      await api.post("/api/v1/users", {
        firebase_uid: emailUser.user.uid,
        name: watch("name")
      });
      navigate("/calorie/input");
    } catch (error) {
      firebaseErrorMessage(error);
      if (error.response) setValidateErrors(error.response.data);
    }
  };

  // ユーザー登録（Google）
  const handleSignInGoogle = async () => {
    try {
      const googleUser = await signInWithPopup(auth, provider);
      await api.post("/api/v1/users", {
        firebase_uid: googleUser.user.uid,
        name: googleUser.user.displayName
      });
      navigate("/calorie/input");
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
            <button type="submit" className="inline-block py-1 border-2 border-white rounded-full bg-primary text-white text-xl hover:bg-hover">
              新規登録
            </button>
          </form>
          <button onClick={handleSignInGoogle} className="flex justify-center items-center gap-2 w-full py-2 bg-white rounded-full hover:bg-hoverWhite">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: "block" }} width={20} height={20}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            Googleで登録
          </button>
        </div>
      </div>
    </div>
  );
}
