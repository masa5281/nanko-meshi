// コンポーネント
import { PasswordResetButton } from "../components/Button/PasswordResetButton";
import { DeleteAccountButton } from "../components/Button/DeleteAccountButton";
// ライブラリ
import { FormProvider, useForm } from "react-hook-form";
import { ProfileForm } from "../components/Profile/ProfileForm";
// カスタムフック
import { useUserDataContext } from "../context/UserDataContext";
import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const { dbUserData } = useUserDataContext();
  const { user } = useAuth();
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      userName: dbUserData.name,
      userEmail: user.email,
      userWeight: dbUserData.weight
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="relative top-8 max-w-md mx-auto px-8 pt-12 pb-5 border-black border-4 rounded-md before:content-[''] before:absolute before:w-56 before:h-10 before:bg-background before:inline-block before:-top-5 before:left-1/2 before:-translate-x-1/2">
        <h2 className="absolute -top-7 left-1/2 -translate-x-1/2 w-52 mx-auto mb-5 py-2 rounded-full bg-black text-white text-2xl text-center">
          アカウント設定
        </h2>

        <div className="mb-4 pb-6 border-b-2 border-black">
          <ProfileForm />
        </div>
        <div className="flex justify-center gap-4">
          {user.providerData[0].providerId !== "google.com" && (
            <PasswordResetButton />
          )}
          <DeleteAccountButton />
        </div>
      </div>
    </FormProvider>
  );
};
