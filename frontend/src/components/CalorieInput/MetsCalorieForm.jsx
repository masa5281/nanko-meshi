// コンポーネント
import { SubmitButton } from "../Button/SubmitButton";
import { InputField } from "../InputField/InputField";
import { DateInput } from "./DateInput";
import { InputValidateErrors } from "../InputField/InputValidateErrors";
// モジュール
import { API_ENDPOINTS, ROUTES } from "../../utils/constants";
import { axiosClient } from "../../config/axiosClient";
import { createCalorieApi } from "../../api/calorieApi";
// ライブラリ
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
// アイコン
import { MdAccessTimeFilled } from "react-icons/md";
import { FaFire } from "react-icons/fa6";
// カスタムフック
import { useUserDataContext } from "../../context/UserDataContext";
import { useValidateError } from "../../context/ValidateErrorContext";
import { IconWrapper } from "../IconWrapper";

export const MetsCalorieForm = () => {
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [dbMetsData, setDbMetsData] = useState("");
  const [recordedDate, setRecordedDate] = useState(new Date());
  const { dbUserData } = useUserDataContext();
  const navigate = useNavigate();
  const { validateErrors, setValidateErrors } = useValidateError();
  const [isTextPlaceholder, setIsTextPlaceholder] = useState(true);
  const selectActivityType = watch("activityType");

  useEffect(() => {
    const getMets = async () => {
      try {
        const response = await axiosClient.get(API_ENDPOINTS.METS.BASE);
        setDbMetsData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMets();
  }, []);

  const createMetsCalorie = async () => {
    try {
      const metsCalorie = metsCalcToCalorie();
      await createCalorieApi(metsCalorie, recordedDate.toString());
      navigate(ROUTES.FOODS.CONVERSION, {
        state: {
          burnedCalorie: metsCalorie
        }
      });
    } catch (error) {
      setValidateErrors(error.response.data);
    }
  };

  // Metsの計算結果
  const metsCalcToCalorie = () => {
    const activeTime = watch("activeTime");
    const selectMetsValue = watch("activityType");
    // 分を時間に変換し、小数第二位で四捨五入
    const calcActiveTime = Math.round((activeTime / 60) * 100) / 100;
    const calcCalorie = Math.round(selectMetsValue * dbUserData.weight * calcActiveTime * 1.05);

    return calcCalorie;
  };

  // 運動項目のプレースホルダーを制御
  useEffect(() => {
    const selectPlaceholder = () => {
      if (selectActivityType === "") {
        setIsTextPlaceholder(true);
      } else {
        setIsTextPlaceholder(false);
      }
    }
    selectPlaceholder();
  }, [selectActivityType])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(createMetsCalorie)}>
        <div className="max-w-[432px] mx-auto mb-3">
          <label
            htmlFor="activityType"
            className="flex items-center pl-3 font-bold"
          >
            <IconWrapper size={20}>
              <div className="mr-0.5">
                <FaFire />
              </div>
              運動項目
            </IconWrapper>
          </label>
          <select
            id="activityType"
            className={`${isTextPlaceholder ? "placeholder" : ""} w-full border-black border-2 rounded-full indent-2 focus:ring-2 focus:ring-primary focus:border-primary`}
            defaultValue=""
            {...register("activityType", {
              required: "運動項目を選択してください"
            })}
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

        <div className="flex justify-center gap-4 px-3 mb-6">
          <InputField
            id="activeTime"
            type="text"
            placeholder="例：30"
            fieldName="activeTime"
            iconComponent={<MdAccessTimeFilled />}
            labelName="運動時間（分）"
            validationRule={{
              required: "運動時間を入力してください",
              min: { value: 1, message: "運動時間は1分以上で入力してください" },
              pattern: {
                value: /^[0-9]+$/,
                message: "運動時間は数字で入力してください"
              }
            }}
          />

          <div className="flex flex-col">
            <DateInput
              recordedDate={recordedDate}
              setRecordedDate={setRecordedDate}
            />
            <InputValidateErrors errors={validateErrors} column="recorded_at" />
          </div>
        </div>

        <SubmitButton>食べ物に換算</SubmitButton>
      </form>
    </FormProvider>
  );
};
