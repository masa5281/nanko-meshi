import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const App = () => {
  const [calorieNum, setCalorieNum] = useState("");
  const [errors, setErrors] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  const createBurnedCalorie = async () => {
    try {
      const response = await axios.post("http://localhost:3000/calories", {
        burned_calorie: calorieNum
      });
      setCalorieNum("");
      setErrors([]);
      console.log(response);
    } catch(error) {
      const ErrorMessages = error.response.data;
      setErrors(ErrorMessages);
    }
  };

  
  return (
    <>
      <h2>消費したカロリーを入力!</h2>
      <p>運動で消費したカロリーを食べ物の個数に換算できます！</p>
      <ul>
        {errors.map((error) => {
          return <li key={error}>{error}</li>
        })}
      </ul>
      <div>
        <input type="number" placeholder="カロリーを入力してください" value={calorieNum} onChange={(e) => setCalorieNum(Number(e.target.value))} />
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <button onClick={createBurnedCalorie}>食べ物に換算</button>
      </div>
    </>
  );
}

export default App;
