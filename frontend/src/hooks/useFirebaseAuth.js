import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { auth, provider } from "../config/firebase";
import { createUserApi, deleteUserApi, getUserApi } from "../api/userApi";

export const useFirebaseAuth = () => {
  const { user } = useAuth();

  // サインアップ（メアド、パスワード）
  const signUp = async (email, password, userName) => {
    const signUpUser = await createUserWithEmailAndPassword(auth, email, password);
    return await createUserApi(signUpUser.user.uid, userName);
  };

  // サインイン（メアド、パスワード）
  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return await getUserApi(userCredential.user.uid);
  };

  // サインアウト
  const handleSignOut = async () => await signOut(auth);

  // サインイン（Google）
  const signInGoogle = async () => {
    const googleUser = await signInWithPopup(auth, provider);
    return await createUserApi(googleUser.user.uid, googleUser.user.displayName);
  };

  // 再認証（Email）
  const emailAuth = async (password) => {
    const credential = EmailAuthProvider.credential(
      user.email,
      password,
    );
    await reauthenticateWithCredential(user, credential);
  };

  // ユーザーの削除
  const deleteAccount = async (uid) => {
    await deleteUserApi(uid);
    await deleteUser(user);
  };

  return {
    signUp,
    signIn,
    handleSignOut,
    signInGoogle,
    emailAuth,
    deleteAccount,
  };
};
