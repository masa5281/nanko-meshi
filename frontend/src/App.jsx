// モジュール
import { ROUTES } from "./utils/constants";
// コンポーネント
import { Header } from "./components/Header/Header";
import { CalorieInput } from "./components/CalorieInput/CalorieInput";
import { FoodConversion } from "./components/FoodConversion/FoodConversion";
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";
import { PasswordResetForm } from "./components/PasswordResetForm";
import { PasswordResetSuccess } from "./components/PasswordResetSuccess";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { GuestRoute } from "./components/GuestRoute";
import { AuthProvider } from "./Context/AuthContext";
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
        </Routes>
      </Router>
    </AuthProvider>
  );
};
