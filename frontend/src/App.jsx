// アイコン用コンポーネント
import { FaFire } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";

import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import { ja } from 'date-fns/locale/ja';
registerLocale('ja', ja)

export const App = () => {
  const [calorieNum, setCalorieNum] = useState("");
  const [errors, setErrors] = useState([]);
  const [recordedDate, setRecordedDate] = useState(new Date());

  const createBurnedCalorie = async () => {
    try {
      const response = await axios.post("http://localhost:3000/calories", {
        burned_calorie: calorieNum,
        recorded_at: recordedDate.toDateString()
      });
      setCalorieNum("");
      setErrors([]);
    } catch(error) {
      const ErrorMessages = error.response.data;
      setErrors(ErrorMessages);
    }
  };
  
  return (
    <>
      <main className="h-screen flex items-center">
        <div className="container mx-auto text-center">
          <div className="mb-20">
            <h2 className="text-5xl font-bold mb-2 text-text gradient-marker">消費したカロリーを入力！</h2>
            <p className="text-base font-bold text-text">運動で消費したカロリーを食べ物の個数に換算できます！</p>
          </div>
          <div className="relative max-w-lg mx-auto pt-12 pb-10 border-slate-900 border-4 rounded-md before:content-[''] before:absolute before:w-56 before:h-10 before:bg-background before:inline-block before:-top-5 before:left-1/2 before:-translate-x-1/2">
            <p className="absolute -top-7 left-1/2 -translate-x-1/2 w-52 mx-auto mb-5 py-3 rounded-full bg-text text-white text-lg font-bold">直接入力する</p>
            
            <div className="mb-6">
              <div className="flex justify-center px-3">
                <div className="flex flex-col items-star">
                  <label htmlFor="calorie" className="flex items-center pl-3 font-bold"><FaFire className="mr-0.5 text-lg" />消費カロリー（kcal）</label>
                  <input type="number" id="calorie" className="indent-2 mr-3 p-3 border-slate-900 border-2 rounded-full focus:ring-2 focus:ring-primary focus:border-primary focus:outline focus:outline-primary" placeholder="例：300" value={calorieNum} onChange={(e) => setCalorieNum(Number(e.target.value))} />

                  {errors.burned_calorie && (
                    <ul className="text-left">
                      {errors.burned_calorie.map((error) => {
                        return <li key={error} className="text-error text-xs font-bold">{error}</li>
                      })}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col items-start">
                  <label htmlFor="calendar" className="flex items-center pl-3 font-bold"><FaCalendarDays className="mr-0.5 text-lg" />日付</label>
                  <DatePicker id="calendar" className="indent-2 p-3 border-slate-900 border-2 rounded-full focus:ring-2 focus:ring-primary focus:border-primary focus:outline focus:outline-primary" dateFormat="yyyy/MM/dd" locale="ja" selected={recordedDate} onChange={(date) => setRecordedDate(date)} />

                  {errors.recorded_at && (
                    <ul className="text-left">
                      {errors.recorded_at.map((error) => {
                        return <li key={error} className="text-error text-xs font-bold">{error}</li>
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <button className="inline-block relative mx-auto px-12 py-3 border-slate-900 border-2 rounded-full bg-primary text-white font-bold hover:bg-hover" onClick={createBurnedCalorie}>食べ物に換算</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;

