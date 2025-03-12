// モジュール
import { ROUTES } from "./utils/constants";
// コンポーネント
import { Header } from "./components/Header/Header";
import { CalorieInput } from "./components/CalorieInput/CalorieInput";
import { FoodConversion } from "./components/FoodConversion/FoodConversion";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { PasswordResetForm } from "./pages/PasswordResetForm"
import { PasswordResetSuccess } from "./pages/PasswordResetSuccess"
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import { GuestRoute } from "./Routes/GuestRoute";
import { AuthProvider } from "./context/AuthContext";
import { FoodRegister } from "./pages/FoodRegister";
// ライブラリ
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            path={ROUTES.AUTH.SIGN_UP}
            element={
              <GuestRoute>
                <SignUp />
              </GuestRoute>
            }
          />
          <Route
            path={ROUTES.AUTH.SIGN_IN}
            element={
              <GuestRoute>
                <SignIn />
              </GuestRoute>
            }
          />
          <Route
            path={ROUTES.AUTH.PASSWORD_RESET}
            element={
              <GuestRoute>
                <PasswordResetForm />
              </GuestRoute>
            }
          />
          <Route
            path={ROUTES.AUTH.PASSWORD_SENT}
            element={
              <GuestRoute>
                <PasswordResetSuccess />
              </GuestRoute>
            }
          />
          <Route
            path={ROUTES.CALORIE.INPUT}
            element={
              <ProtectedRoute>
                <CalorieInput />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.FOODS.CONVERSION}
            element={
              <ProtectedRoute>
                <FoodConversion />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.FOODS.REGISTER}
            element={
              <ProtectedRoute>
                <FoodRegister />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
