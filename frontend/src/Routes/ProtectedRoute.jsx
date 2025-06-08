// モジュール
import { ROUTES } from "../utils/constants";
// ライブラリ
import { Navigate } from "react-router-dom"
// カスタムフック
import { useAuth } from "../context/AuthContext";

// 未ログイン時にサインインへ遷移
export const ProtectedRoute = ({ children }) => {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) return null;
  if (!user) return <Navigate to={ROUTES.AUTH.SIGN_IN} />

  return children;
};
