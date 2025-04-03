// モジュール
import { ROUTES } from "./utils/constants";
// コンポーネント
import { Header } from "./components/Header/Header";
import { CalorieInput } from "./pages/CalorieInput";
import { FoodConversion } from "./components/FoodConversion/FoodConversion";
import { FoodRegister } from "./pages/FoodRegister";
import { RegisterdFood } from "./pages/RegisterdFood";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { PasswordResetForm } from "./pages/PasswordResetForm"
import { PasswordResetSuccess } from "./pages/PasswordResetSuccess"
import { WeightRegister } from "./pages/WeightRegister";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./Routes/ProtectedRoute";
import { GuestRoute } from "./Routes/GuestRoute";
import { WeightCheckNavigator } from "./Routes/WeightCheckNavigator";
import { AuthProvider } from "./context/AuthContext";
import { UserDataProvider } from "./context/UserDataContext";
import { ToastContainer } from 'react-toastify';
// ライブラリ
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactModal from "react-modal";
import { ValidateErrorProvider } from "./context/ValidateErrorContext";

ReactModal.setAppElement('#root');

export const App = () => {
  return (
    <AuthProvider>
      <UserDataProvider>
        <ValidateErrorProvider>
          <ToastContainer />
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
                path={ROUTES.AUTH.WEIGHT}
                element={
                  <ProtectedRoute>
                    <WeightCheckNavigator skipWeightCheck={true}>
                      <WeightRegister />
                    </WeightCheckNavigator>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.CALORIE.INPUT}
                element={
                  <ProtectedRoute>
                    <WeightCheckNavigator>
                      <CalorieInput />
                    </WeightCheckNavigator>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.FOODS.CONVERSION}
                element={
                  <ProtectedRoute>
                    <WeightCheckNavigator>
                      <FoodConversion />
                    </WeightCheckNavigator>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.FOODS.REGISTER}
                element={
                  <ProtectedRoute>
                    <WeightCheckNavigator>
                      <FoodRegister />
                    </WeightCheckNavigator>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.USERS.ITEM}
                element={
                  <ProtectedRoute>
                    <WeightCheckNavigator>
                      <RegisterdFood />
                    </WeightCheckNavigator>
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.USERS.PROFILE}
                element={
                  <ProtectedRoute>
                    <WeightCheckNavigator>
                      <Profile />
                    </WeightCheckNavigator>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </ValidateErrorProvider>
      </UserDataProvider>
    </AuthProvider>
  );
};
