// モジュール
import { ROUTES } from "./utils/constants";
import { setupAxiosStateError } from "./config/axiosClient";
// Pages
import { Header } from "./components/Header/Header";
import { CalorieInput } from "./pages/CalorieInput";
import { FoodConversion } from "./pages/FoodConversion";
import { FoodRegister } from "./pages/FoodRegister";
import { RegisteredFood } from "./pages/RegisteredFood";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { PasswordResetForm } from "./pages/PasswordResetForm"
import { PasswordResetSuccess } from "./pages/PasswordResetSuccess"
import { WeightRegister } from "./pages/WeightRegister";
import { Profile } from "./pages/Profile";
import { Page404 } from "./pages/404";
import { BarGraph } from "./pages/BarGraph";
import { TopPage } from "./pages/TopPage";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { Footer } from "./components/Footer";

import { ProtectedRoute } from "./Routes/ProtectedRoute";
import { GuestRoute } from "./Routes/GuestRoute";
import { WeightCheckNavigator } from "./Routes/WeightCheckNavigator";
import { AuthProvider } from "./context/AuthContext";
import { UserDataProvider } from "./context/UserDataContext";
// ライブラリ
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactModal from "react-modal";
import { ValidateErrorProvider } from "./context/ValidateErrorContext";
import { ToastProvider } from "./components/ToastProvider";
import { useEffect, useState } from "react";

ReactModal.setAppElement('#root');

export const App = () => {
  const [stateError, setStateError] = useState("");

  useEffect(() => {
    setupAxiosStateError(setStateError);
  }, [setStateError]);

  return (
    <ToastProvider>
      <AuthProvider>
        <UserDataProvider>
          <ValidateErrorProvider>
            <Router>
              {stateError === 404 ? (
                <Page404 />
              ) : (
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route
                        path="*"
                        element={
                          <Page404 />
                        }
                      />
                      <Route
                        path={ROUTES.TOP}
                        element={
                          <TopPage />
                        }
                      />
                      <Route
                        path={ROUTES.TERMS}
                        element={
                          <Terms />
                        }
                      />
                      <Route
                        path={ROUTES.PRIVACY}
                        element={
                          <Privacy />
                        }
                      />
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
                        path={ROUTES.USERS.PROFILE}
                        element={
                          <ProtectedRoute>
                            <WeightCheckNavigator>
                              <Profile />
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
                        path={ROUTES.FOODS.MY_REGISTERED}
                        element={
                          <ProtectedRoute>
                            <WeightCheckNavigator>
                              <RegisteredFood />
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
                        path={ROUTES.CALORIE.GRAPH}
                        element={
                          <ProtectedRoute>
                            <WeightCheckNavigator>
                              <BarGraph />
                            </WeightCheckNavigator>
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              )}
            </Router>
          </ValidateErrorProvider>
        </UserDataProvider>
      </AuthProvider>
    </ToastProvider >
  );
};
