// コンポーネント
import { DateInput } from "./DateInput";
import { InputValidateErrors } from "../InputField/InputValidateErrors";
import { SubmitButton } from "../Button/SubmitButton"
import { InputField } from "../InputField/InputField";
// ライブラリ
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
// アイコン
import { FaFire } from "react-icons/fa6";
// カスタムフック
import { useValidateError } from "../../context/ValidateErrorContext";
import { useCalorieApi } from "../../hooks/useCalorieApi";

export const ManualCalorieForm = () => {
  const [recordedDate, setRecordedDate] = useState(new Date());
  const { validateErrors, setValidateErrors } = useValidateError();
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { watch, handleSubmit } = methods;
  const manulaCalorie = watch("calorie");
  const { createCalorie } = useCalorieApi();

  const handleCreateCalorie = async () => {
    try {
      await createCalorie(manulaCalorie, recordedDate)
    } catch (error) {
      setValidateErrors(error.response.data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleCreateCalorie)}>
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

          <div className="flex flex-col">
            <DateInput recordedDate={recordedDate} setRecordedDate={setRecordedDate} />
            <InputValidateErrors errors={validateErrors} column="recorded_at" />
          </div>
        </div>
        <SubmitButton>食べ物に換算</SubmitButton>
      </form>
    </FormProvider>
  );
};
