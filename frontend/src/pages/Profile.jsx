import { FormProvider, useForm } from "react-hook-form";
import { ProfileForm } from "../components/Profile/ProfileForm";
import { useUserDataContext } from "../context/UserDataContext";
import { useAuth } from "../context/AuthContext";
import { PasswordResetButton } from "../components/Button/PasswordResetButton";
import { ToastContainer } from 'react-toastify';

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
    <div className="relative top-8 max-w-md mx-auto px-8 pt-12 pb-5 border-black border-4 rounded-md before:content-[''] before:absolute before:w-56 before:h-10 before:bg-background before:inline-block before:-top-5 before:left-1/2 before:-translate-x-1/2">
      <ToastContainer />
      <h2 className="absolute -top-7 left-1/2 -translate-x-1/2 w-52 mx-auto mb-5 py-2 rounded-full bg-black text-white text-2xl text-center">
        アカウント設定
      </h2>
      <div className="mb-4 pb-6 border-b-2 border-black">
        <FormProvider {...methods}>
          <ProfileForm />
        </FormProvider>
      </div>
      <PasswordResetButton />
    </div>
  );
};
