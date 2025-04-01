// モジュール
import { ROUTES } from "../utils/constants";
// ライブラリ
import { Navigate } from "react-router-dom";
// カスタムフック
import { useUserDataContext } from "../context/UserDataContext";

// 体重未入力時 → 体重入力へ遷移
// 体重が既に入力時に体重入力画面に遷移 → カロリー入力画面に遷移
export const WeightCheckNavigator = ({ children, skipWeightCheck = false }) => {
  const { dbUserData } = useUserDataContext();

  if (!dbUserData) return null;

  if (skipWeightCheck) {
    return dbUserData.weight ? <Navigate to={ROUTES.CALORIE.INPUT} /> : children;
  } else {
    return !dbUserData.weight ? <Navigate to={ROUTES.AUTH.WEIGHT} /> : children;
  }
};
