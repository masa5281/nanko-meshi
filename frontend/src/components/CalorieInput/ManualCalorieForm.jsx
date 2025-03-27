// コンポーネント
import { DateInput } from "./DateInput";
import { SubmitButton } from "../Button/SubmitButton"
import { InputField } from "../InputField/InputField";
// ライブラリ
import { FormProvider, useForm } from "react-hook-form";
// アイコン
import { FaFire } from "react-icons/fa6";
// カスタムフック
import { useValidateError } from "../../context/ValidateErrorContext";
import { useCalorieApi } from "../../hooks/useCalorieApi";

export const ManualCalorieForm = () => {
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      manualDate: new Date(),
    }
  });
  const {
    watch,
    handleSubmit,
    setError
  } = methods;
  const manulaCalorie = watch("calorie");
  const recordedDate = watch("manualDate");
  const { setValidateErrors } = useValidateError();
  const { createCalorie } = useCalorieApi();

  const handleCreateCalorie = async () => {
    try {
      await createCalorie(manulaCalorie, recordedDate)
    } catch (error) {
      const { recorded_at: dateError, ...otherError } = error.response.data;
      setError("manualDate", { type: "manual", message: dateError[0] });
      setValidateErrors(otherError);
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
              validate: {
                firstZero: (value) =>
                  /^0/.test(value) ? "先頭に0を入力しないでください" : null,
                checkCalorieNum: (value) =>
                  /^[0-9]+$/.test(value) || "カロリーは数字で入力してください",
              }
            }}
            columnName="burned_calorie"
          />

          <div className="flex flex-col">
            <DateInput fieldName="manualDate" />
          </div>
        </div>
        <SubmitButton>食べ物に換算</SubmitButton>
      </form>
    </FormProvider>
  );
};
