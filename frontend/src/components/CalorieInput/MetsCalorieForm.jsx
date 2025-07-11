// コンポーネント
import { SubmitButton } from "../Button/SubmitButton";
import { InputField } from "../InputField/InputField";
import { DateInput } from "./DateInput";
import { IconProvider } from "../IconProvider";
// モジュール
import { axiosClient } from "../../config/axiosClient";
import { selectPlaceholder } from "../../utils/formUtils";
import { API_ENDPOINTS, VALIDATE_MESSAGES } from "../../utils/constants";
// ライブラリ
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
// アイコン
import { MdAccessTimeFilled } from "react-icons/md";
import { FaFire } from "react-icons/fa6";
// カスタムフック
import { useUserDataContext } from "../../context/UserDataContext";
import { useValidateError } from "../../context/ValidateErrorContext";
import { useCalorieApi } from "../../hooks/useCalorieApi";

export const MetsCalorieForm = () => {
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      metsDate: new Date(),
    }
  });
  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [dbMetsData, setDbMetsData] = useState([]);
  const { dbUserData } = useUserDataContext();
  const { validateErrors, setValidateErrors } = useValidateError();
  const [isTextPlaceholder, setIsTextPlaceholder] = useState(true);
  const selectActivityType = watch("activityType");
  const recordedDate = watch("metsDate");
  const { createCalorie } = useCalorieApi();

  // Mets情報をDBから取得
  useEffect(() => {
    const abortController = new AbortController();
    const getMets = async () => {
      try {
        //AbortControllerとaxiosの紐付け
        const response = await axiosClient.get(API_ENDPOINTS.METS.BASE, { signal: abortController.signal });
        setDbMetsData(response.data);
      } catch (error) {
        if (error.name === "CanceledError") {
          return;
        }
        console.error(error);
      }
    }
    getMets();
    return () => {
      //アンマウント時に通信を中止
      abortController.abort();
    }
  }, []);

  useEffect(() => {
    selectPlaceholder(selectActivityType, setIsTextPlaceholder);
  }, [selectActivityType]);

  const handleCreateCalorie = async () => {
    try {
      const metsCalorie = metsCalcToCalorie();
      await createCalorie(metsCalorie, recordedDate);
    } catch (error) {
      const { recorded_at: dateError, ...otherError } = error.response.data;
      setError("metsDate", { type: "manual", message: dateError[0] });
      setValidateErrors(otherError);
    }
  };

  // Metsの計算結果
  const metsCalcToCalorie = () => {
    const activityTime = watch("activityTime");
    const selectMetsValue = watch("activityType");
    // 分を時間に変換し、小数第二位で四捨五入
    const calcActivityTime = Math.round((activityTime / 60) * 100) / 100;
    const calcCalorie = Math.round(selectMetsValue * dbUserData.weight * calcActivityTime * 1.05);
    return calcCalorie;
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleCreateCalorie)} className="mb-4">
        <div className="max-w-[432px] mx-auto mb-3">
          <label
            htmlFor="activityType"
            className="flex items-center pl-3 font-bold"
          >
            <IconProvider size={20}>
              <div className="mr-0.5">
                <FaFire />
              </div>
              運動項目
            </IconProvider>
          </label>
          <select
            id="activityType"
            className={`${isTextPlaceholder ? "placeholder" : ""} w-full border-black border-2 rounded-full indent-2 focus:ring-2 focus:ring-primary focus:border-primary`}
            defaultValue=""
            {...register("activityType", VALIDATE_MESSAGES.METS.ACTIVITY_TYPE)}
          >
            <option value="" disabled>運動項目を選択</option>
            {dbMetsData && dbMetsData.map((met) =>
              <option key={met.id} value={met.mets_value}>{met.activity_name}</option>
            )}
          </select>
          <ErrorMessage
            errors={errors}
            name="activityType"
            render={({ message }) =>
              message ? (
                <p className="pl-2 text-error text-xs font-bold text-left">{message}</p>
              ) : null
            }
          />
          {validateErrors?.["activity_name"] && (
            validateErrors["activity_name"].map((error, index) =>
              error ? (
                <p key={index} className="pl-2 text-error text-xs font-bold text-left">{error}</p>
              ) : null
            )
          )}
        </div>

        <div className="md:flex justify-center gap-4 mb-6">
          <InputField
            id="activityTime"
            type="text"
            placeholder="例：30"
            fieldName="activityTime"
            iconComponent={<MdAccessTimeFilled />}
            labelName="運動時間（分）"
            validationRule={VALIDATE_MESSAGES.METS.ACTIVITY_TIME}
          />
          <DateInput fieldName="metsDate" />
        </div>

        <SubmitButton>食べ物に換算</SubmitButton>
      </form>
    </FormProvider>
  );
};
