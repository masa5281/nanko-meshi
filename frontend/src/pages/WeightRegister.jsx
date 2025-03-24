import { useRef, useState } from "react";
import { setWeight } from "../utils/formUtils";
import { AuthSubmitButton } from "../components/Button/AuthSubmitButton";
import { getUserApi, updateUserApi } from "../api/userApi";
import { useAuth } from "../context/AuthContext";

export const WeightRegister = () => {
  const [bodyWeight, setBodyWeight] = useState();
  const bodyWeightRef = useRef(null);
  const weights = setWeight();
  const { user } = useAuth();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const dbUserData = await getUserApi(user.uid);
      const response = await updateUserApi(
        dbUserData.name,
        bodyWeight,
        dbUserData.avatar,
        user.uid
      )
      return response;
    } catch (error) {
      console.log(error);
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
