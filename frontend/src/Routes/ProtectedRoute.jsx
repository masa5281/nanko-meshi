// モジュール
import { ROUTES } from "../utils/constants";
// ライブラリ
import { Navigate } from "react-router-dom"
// カスタムフック
import { useAuth } from "../context/AuthContext";
import { useUserDataContext } from "../context/UserDataContext";

// 未ログイン時はサインインへ遷移、体重未入力時は体重入力へ遷移
export const ProtectedRoute = ({ children, skipWeightCheck = false }) => {
  const { user, isAuthReady } = useAuth();
  const { dbUserData } = useUserDataContext();

  if (!isAuthReady) return null;
  if (!user) return <Navigate to={ROUTES.AUTH.SIGN_IN} />
  if (!dbUserData) return null;
  if (!skipWeightCheck && !dbUserData.weight) return <Navigate to={ROUTES.AUTH.WEIGHT} />

  return children;
};
