// モジュール
import { createCalorieApi } from "../../api/calorieApi";
import { ROUTES } from "../../utils/constants";
import { getUserApi } from "../../api/userApi";
// コンポーネント
import { DateInput } from "./DateInput";
import { InputValidateErrors } from "./InputValidateErrors";
import { SubmitButton } from "../Button/SubmitButton"
// ライブラリ
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// アイコン
import { FaFire } from "react-icons/fa6";
// カスタムフック
import { useAuth } from "../../context/AuthContext";

export const ManualCalorieForm = () => {
  const [calorieNum, setCalorieNum] = useState("");
  const [recordedDate, setRecordedDate] = useState(new Date());
  const [validateErrors, setValidateErrors] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleSubmit } = useForm();

  const createManualCalorie = async () => {
    try {
      await createCalorieApi(calorieNum, recordedDate.toDateString(), user.uid);
      const dbUserData = await getUserApi(user.uid);
      navigate(ROUTES.FOODS.CONVERSION, {
        state: {
          burned_calorie: calorieNum,
          userName: dbUserData.name
        }
      });
    } catch (error) {
      setValidateErrors(error.response.data);
    } finally {
      setCalorieNum("");
    }
  };

  // 入力値を全角→半角変換
  const onChangeToText = (e) => {
    const inputText = e.target.value;
    const toHalfWidth = inputText.replace(/[０-９]/g, (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0));
    setCalorieNum(toHalfWidth);
  }

  return (
    <form onSubmit={handleSubmit(createManualCalorie)}>
      <div className="flex justify-center px-3 mb-6">
        <div className="flex flex-col items-star">
          <label htmlFor="calorie" className="flex items-center pl-3 font-bold"><FaFire className="mr-0.5 text-lg" />消費カロリー（kcal）</label>
          <input
            type="text"
            id="calorie"
            className="mr-3 border-slate-900 border-2 rounded-full indent-2 focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="例：300"
            value={calorieNum}
            onChange={onChangeToText}
          />
          <InputValidateErrors errors={validateErrors} column="burned_calorie" />
        </div>
        <div className="flex flex-col items-start">
          <DateInput recordedDate={recordedDate} setRecordedDate={setRecordedDate} />
          <InputValidateErrors errors={validateErrors} column="recorded_at" />
        </div>
      </div>
      <SubmitButton>食べ物に換算</SubmitButton>
    </form>
  );
};
