import { Header } from "./components/Header/Header";
import { CalorieInput } from "./components/CalorieInput/CalorieInput";
import { FoodConversion } from "./components/FoodConversion/FoodConversion";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { PasswordResetForm } from "./components/PasswordResetForm";
import { PasswordResetSuccess } from "./components/PasswordResetSuccess";
// ライブラリ
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/password_reset" element={<PasswordResetForm />} />
          <Route path="/password_sent" element={<PasswordResetSuccess />} />
          <Route path="/calorie/input" element={<CalorieInput />} />
          <Route path="/foods/conversion" element={<FoodConversion />} />
        </Routes>
      </Router>  
    </>
  );
}
