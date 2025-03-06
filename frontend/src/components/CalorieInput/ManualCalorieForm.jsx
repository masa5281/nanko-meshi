// コンポーネント
import { DateInput } from "./DateInput";
import { CalorieInputError } from "./CalorieInputError";
import { CalorieSubmit } from "./CalorieSubmit";
import { api } from "../../api";
// ライブラリ
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// アイコン
import { FaFire } from "react-icons/fa6";

export const ManualCalorieForm = () => {
  const [calorieNum, setCalorieNum] = useState("");
  const [recordedDate, setRecordedDate] = useState(new Date());
  const [validateErrors, setValidateErrors] = useState([]);
  const navigate = useNavigate();

  const createManualCalorie = async () => {
    try {
      await api.post("/api/v1/calories", {
        burned_calorie: calorieNum,
        recorded_at: recordedDate.toDateString()
      });
      navigate("/foods/conversion", {
        state: { burned_calorie: calorieNum }
      });
    } catch(error) {
      setValidateErrors(error.response.data);
    }
    setCalorieNum("");
  };

  // 入力値を全角→半角変換
  const onChangeToText = (e) => {
    const inputText = e.target.value;
    const toHalfWidth = inputText.replace(/[０-９]/g, (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0));
    setCalorieNum(toHalfWidth);
  }

  return (
    <div className="relative max-w-lg mx-auto pt-12 pb-10 border-slate-900 border-4 rounded-md before:content-[''] before:absolute before:w-56 before:h-10 before:bg-background before:inline-block before:-top-5 before:left-1/2 before:-translate-x-1/2">
      <p className="absolute -top-7 left-1/2 -translate-x-1/2 w-52 mx-auto mb-5 py-3 rounded-full bg-text text-white font-bold text-lg">直接入力する</p>

      <div className="mb-6">
        <div className="flex justify-center px-3">
          <div className="flex flex-col items-star">
            <label htmlFor="calorie" className="flex items-center pl-3 font-bold"><FaFire className="mr-0.5 text-lg" />消費カロリー（kcal）</label>
            <input type="text" id="calorie" className="mr-3 p-3 border-slate-900 border-2 rounded-full indent-2 focus:ring-2 focus:ring-primary focus:border-primary" placeholder="例：300" value={calorieNum} onChange={onChangeToText} />
            <CalorieInputError errors={validateErrors} column="burned_calorie" />
          </div>
          <div className="flex flex-col items-start">
            <DateInput recordedDate={recordedDate} setRecordedDate={setRecordedDate} />
            <CalorieInputError errors={validateErrors} column="recorded_at" />
          </div>
        </div>
      </div>
      
      <CalorieSubmit onClick={createManualCalorie} />
    </div>
  );
}
