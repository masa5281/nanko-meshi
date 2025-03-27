// モジュール
import { ROUTES } from "../utils/constants";
// ライブラリ
import { Navigate } from "react-router-dom"
// カスタムフック
import { useAuth } from "../context/AuthContext";
import { useUserDataContext } from "../context/UserDataContext";

/**
 * 未ログイン時 → サインインへ遷移
 * 体重未入力時 → 体重入力へ遷移
 * 体重が既に入力時に体重入力画面に遷移 → カロリー入力画面に遷移
 */
export const ProtectedRoute = ({ children, skipWeightCheck = false }) => {
  const { user, isAuthReady } = useAuth();
  const { dbUserData } = useUserDataContext();

  if (!isAuthReady) return null;
  if (!user) return <Navigate to={ROUTES.AUTH.SIGN_IN} />

  if (!dbUserData) return null;
  if (skipWeightCheck && dbUserData.weight) return <Navigate to={ROUTES.CALORIE.INPUT} />
  if (!skipWeightCheck && !dbUserData.weight) return <Navigate to={ROUTES.AUTH.WEIGHT} />

  return children;
};
