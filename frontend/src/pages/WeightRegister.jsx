// コンポーネント
import { AuthSubmitButton } from "../components/Button/AuthSubmitButton";
import { IconWrapper } from "../components/IconWrapper";
// モジュール
import { selectPlaceholder, setWeight } from "../utils/formUtils";
import { useAuth } from "../context/AuthContext";
import { getUserApi, updateUserApi } from "../api/userApi";
import { ROUTES } from "../utils/constants";
// ライブラリ
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// カスタムフック
import { useUserDataContext } from "../context/UserDataContext";
// アイコン
import { GiWeightScale } from "react-icons/gi";

export const WeightRegister = () => {
  const weights = setWeight();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setDbUserData } = useUserDataContext();
  const [isTextPlaceholder, setIsTextPlaceholder] = useState(true);
  const [validateErrors, setValidateErrors] = useState([]);
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { register, watch, handleSubmit, formState: { errors } } = methods;
  const selectWeight = watch("userWeight");

  useEffect(() => {
    selectPlaceholder(selectWeight, setIsTextPlaceholder);
  }, [selectWeight]);

  const handleUpdateUser = async () => {
    try {
      const userData = await getUserApi(user.uid);
      await updateUserApi(
        userData.name,
        selectWeight,
        userData.avatar,
        user.uid
      );
      const updateUserData = await getUserApi(user.uid);
      setDbUserData(updateUserData);
      navigate(ROUTES.CALORIE.INPUT);
    } catch (error) {
      setValidateErrors(error.response.data);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="pt-12">
        <div className="max-w-xs mx-auto px-10 py-6 bg-header rounded-md shadow-md shadow-shadow">
          <h2 className="mb-5 pb-2 border-b border-white text-white text-3xl text-center">現在の体重を選択</h2>

          <form onSubmit={handleSubmit(handleUpdateUser)} className="flex flex-col">
            <div className="relative mb-4">
              <label htmlFor="userWeight" className="absolute top-1 left-1 p-1 rounded-full bg-black">
                <IconWrapper size={24} color="#fff">
                  <GiWeightScale />
                </IconWrapper>
              </label>
              <select
                id="userWeight"
                defaultValue=""
                className={`${isTextPlaceholder ? "placeholder" : ""} w-full py-2 border-none rounded-full indent-8 focus:ring-2 focus:ring-secondary focus:border-secondary`}
                {...register("userWeight", {
                  required: "体重を選択してください"
                })}
              >
                <option value="" disabled>体重を選択</option>
                {weights.map((weight) =>
                  <option key={weight} value={weight}>{weight}</option>
                )}
              </select>
              <span className="absolute top-1.5 right-8 pointer-events-none">kg</span>
              <ErrorMessage
                errors={errors}
                name="userWeight"
                render={({ message }) =>
                  message ? (
                    <p className="pl-2 text-errorYellow text-sm">{message}</p>
                  ) : null
                }
              />
              {validateErrors?.["weight"] && (
                validateErrors["weight"].map((error, index) =>
                  error ? (
                    <p key={index} className="pl-2 text-errorYellow text-sm">{error}</p>
                  ) : null
                )
              )}
            </div>

            <AuthSubmitButton>決定</AuthSubmitButton>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};
