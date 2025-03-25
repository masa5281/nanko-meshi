// コンポーネント
import { AuthSubmitButton } from "../components/Button/AuthSubmitButton";
// モジュール
import { setWeight } from "../utils/formUtils";
import { useAuth } from "../context/AuthContext";
import { getUserApi, updateUserApi } from "../api/userApi";
import { ROUTES } from "../utils/constants";
// ライブラリ
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// カスタムフック
import { useUserDataContext } from "../context/UserDataContext";

export const WeightRegister = () => {
  const [bodyWeight, setBodyWeight] = useState();
  const bodyWeightRef = useRef(null);
  const weights = setWeight();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setDbUserData } = useUserDataContext();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const userData = await getUserApi(user.uid);
      await updateUserApi(
        userData.name,
        bodyWeight,
        userData.avatar,
        user.uid
      );
      const updateUserData = await getUserApi(user.uid);
      setDbUserData(updateUserData);
      navigate(ROUTES.CALORIE.INPUT);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-12">
      <div className="max-w-md mx-auto px-10 py-6 bg-header rounded-md shadow-md shadow-shadow">
        <h2 className="mb-5 pb-2 border-b border-white text-white text-3xl text-center">現在の体重を選択</h2>
        <form onSubmit={handleUpdateUser} className="flex flex-col">
          <select
            ref={bodyWeightRef}
            value={bodyWeight}
            onChange={(e) => setBodyWeight(e.target.value)}
            className="mb-4"
          >
            <option value={""}>体重を選択してください</option>
            {weights.map((weight) => <option key={weight} value={weight}>{weight}</option>)}
          </select>
          <AuthSubmitButton>決定</AuthSubmitButton>
        </form>
      </div>
    </div>
  );
};
