// コンポーネント
import { PasswordResetForm } from "../components/Profile/PasswordResetForm";
import { DeleteAccountForm } from "../components/Profile/DeleteAccountForm";
import { CustomModal } from "../components/CustomModal";
// ライブラリ
import { FormProvider, useForm } from "react-hook-form";
import { ProfileForm } from "../components/Profile/ProfileForm";
import { useState } from "react";
// カスタムフック
import { useUserDataContext } from "../context/UserDataContext";
import { useAuth } from "../context/AuthContext";

export const Profile = () => {
  const { dbUserData } = useUserDataContext();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const isGoogleUser = user.providerData[0].providerId === "google.com";
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      userName: dbUserData.name,
      userEmail: user.email,
      userWeight: dbUserData.weight
    }
  });

  const openUserModal = (type) => {
    setModalType(type);
    setIsOpen(true);
  };

  const closeUserModal = () => setIsOpen(false);

  return (
    <FormProvider {...methods}>
      {modalType === "passwordReset" && (
        <CustomModal isOpen={isOpen} title={"パスワード再設定"}>
          <PasswordResetForm
            setIsOpen={setIsOpen}
            closeUserModal={closeUserModal}
          />
        </CustomModal>
      )}
      {modalType === "delete" && (
        <CustomModal isOpen={isOpen} title={"退会"}>
          <DeleteAccountForm
            setIsOpen={setIsOpen}
            isGoogleUser={isGoogleUser}
            closeUserModal={closeUserModal}
          />
        </CustomModal>
      )}

      <div className="relative top-8 max-w-md mx-auto px-8 pt-12 pb-5 border-black border-4 rounded-md before:content-[''] before:absolute before:w-56 before:h-10 before:bg-background before:inline-block before:-top-5 before:left-1/2 before:-translate-x-1/2">
        <h2 className="absolute -top-7 left-1/2 -translate-x-1/2 w-52 mx-auto mb-5 py-2 rounded-full bg-black text-white text-2xl text-center">
          アカウント設定
        </h2>
        <div className="mb-4 pb-6 border-b-2 border-black">
          <ProfileForm
            isOpen={isOpen}
            isGoogleUser={isGoogleUser}
            modalType={modalType}
            openUserModal={openUserModal}
            closeUserModal={closeUserModal}
          />
        </div>
        <div className="flex justify-center gap-4">
          {!isGoogleUser && (
            <button
              className="px-2 py-1 text-white bg-black rounded-md hover:brightness-125"
              onClick={() => openUserModal("passwordReset")}
            >
              パスワード再設定
            </button>
          )}
          <button
            className="px-2 py-1 text-white bg-delete rounded-md hover:brightness-105"
            onClick={() => openUserModal("delete")}
          >
            退会のお手続き
          </button>
        </div>
      </div>
    </FormProvider >
  );
};
