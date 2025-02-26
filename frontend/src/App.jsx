import { Header } from "./components/Header/Header";
import { CalorieInput } from "./components/CalorieInput/CalorieInput";
import { FoodConversion } from "./components/FoodConversion/FoodConversion";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/calorie/input" element={<CalorieInput />} />
          <Route path="/foods/conversion" element={<FoodConversion />} />
        </Routes>
      </Router>  
    </>
  );
}

export default App;
