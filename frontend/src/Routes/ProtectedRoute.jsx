// モジュール
import { ROUTES } from "../utils/constants";
// ライブラリ
import { Navigate } from "react-router-dom"
// カスタムフック
import { useAuth } from "../context/AuthContext";
import { getUserApi } from "../api/userApi";
import { useEffect, useState } from "react";

// 未ログイン時、サインインへ遷移
export const ProtectedRoute = ({ children, skipWeightCheck = false }) => {
  const { user, isAuthReady } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) return;

    const getUser = async () => {
      try {
        const dbUserData = await getUserApi(user.uid);
        setUserData(dbUserData);
      } catch (error) {
        setUserData(null);
      }
    };
    getUser();
  }, [user]);

  if (!isAuthReady) return null;
  if (!user) return <Navigate to={ROUTES.AUTH.SIGN_IN} />
  if (!userData) return null;
  if (!skipWeightCheck && !userData.weight) return <Navigate to={ROUTES.AUTH.WEIGHT} />

  return children;
};
