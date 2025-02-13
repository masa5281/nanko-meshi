import axios from "axios";
import { useState } from "react";

export const App = () => {
  const [calorieNum, setCalorieNum] = useState("");

  const createBurnedCalorie = () => {
    axios.post("http://localhost:3000/calories", {
      burned_calorie: calorieNum
    })
    .then(() => {
      setCalorieNum("");
      console.log("OK");
    })
    // エラー時にアラートを表示
    .catch((error) => {
      window.alert(error.message)
      console.log("NG");
    })
  };

  return (
    <>
      <h2>消費したカロリーを入力!</h2>
      <p>運動で消費したカロリーを食べ物の個数に換算できます！</p>
      <div>
        <input type="number" placeholder="カロリーを入力してください" value={calorieNum} onChange={(e) => setCalorieNum(Number(e.target.value))} />
        <button onClick={createBurnedCalorie}>食べ物に換算</button>
      </div>
    </>
  );
}

export default App;
