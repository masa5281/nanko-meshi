// モジュール
import { ROUTES } from "../utils/constants";
// ライブラリ
import { Navigate } from "react-router-dom"
// カスタムフック
import { useAuth } from "../context/AuthContext";

export const GuestRoute = ({ children }) => {
  const { user, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return null;
  }

  return !user ? children : <Navigate to={ROUTES.CALORIE.INPUT} />;
}
