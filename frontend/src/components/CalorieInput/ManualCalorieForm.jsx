// モジュール
import { createCalorieApi } from "../../api/calorieApi";
import { ROUTES } from "../../utils/constants";
import { getUserApi } from "../../api/userApi";
// コンポーネント
import { DateInput } from "./DateInput";
import { InputValidateErrors } from "./InputValidateErrors";
import { SubmitButton } from "../Button/SubmitButton"
import { InputField } from "../InputField/InputField";
// ライブラリ
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
// アイコン
import { FaFire } from "react-icons/fa6";
// カスタムフック
import { useAuth } from "../../context/AuthContext";
import { useValidateError } from "../../context/ValidateErrorContext";

export const ManualCalorieForm = () => {
  const [recordedDate, setRecordedDate] = useState(new Date());
  const navigate = useNavigate();
  const { user } = useAuth();
  const { validateErrors, setValidateErrors } = useValidateError();

  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { watch, handleSubmit, setValue } = methods;

  const createManualCalorie = async () => {
    try {
      await createCalorieApi(watch("calorie"), recordedDate.toDateString(), user.uid);
      const dbUserData = await getUserApi(user.uid);
      navigate(ROUTES.FOODS.CONVERSION, {
        state: {
          burned_calorie: watch("calorie"),
          userName: dbUserData.name
        }
      });
    } catch (error) {
      setValidateErrors(error.response.data);
    } finally {
      setValue("calorie", "");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(createManualCalorie)}>
        <div className="flex justify-center gap-4 px-3 mb-6">
          <InputField
            id="calorie"
            type="text"
            placeholder="例：300"
            fieldName="calorie"
            iconComponent={<FaFire />}
            labelName="消費カロリー（kcal）"
            validationRule={{
              required: "カロリーを入力してください",
              min: { value: 1, message: "カロリーは1以上で入力してください" },
            }}
            columnName="burned_calorie"
          />

          <div className="flex flex-col items-start">
            <DateInput recordedDate={recordedDate} setRecordedDate={setRecordedDate} />
            <InputValidateErrors errors={validateErrors} column="recorded_at" />
          </div>
        </div>
        <SubmitButton>食べ物に換算</SubmitButton>
      </form>
    </FormProvider>
  );
};
