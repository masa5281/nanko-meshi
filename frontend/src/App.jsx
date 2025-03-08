import { Header } from "./components/Header/Header";
import { CalorieInput } from "./components/CalorieInput/CalorieInput";
import { FoodConversion } from "./components/FoodConversion/FoodConversion";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { PasswordResetForm } from "./components/PasswordResetForm";
import { PasswordResetSuccess } from "./components/PasswordResetSuccess";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GuestRoute } from "./components/GuestRoute";
// ライブラリ
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/sign_up"
            element={
              <GuestRoute>
                <SignUp />
              </GuestRoute>
            }
          />
          <Route
            path="/sign_in"
            element={
              <GuestRoute>
                <SignIn />
              </GuestRoute>
            }
          />
          <Route
            path="/password_reset"
            element={
              <GuestRoute>
                <PasswordResetForm />
              </GuestRoute>
            }
          />
          <Route
            path="/password_sent"
            element={
              <GuestRoute>
                <PasswordResetSuccess />
              </GuestRoute>
            }
          />
          <Route
            path="/calorie/input"
            element={
              <ProtectedRoute>
                <CalorieInput />
              </ProtectedRoute>
            }
          />
          <Route
            path="/foods/conversion"
            element={
              <ProtectedRoute>
                <FoodConversion />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
