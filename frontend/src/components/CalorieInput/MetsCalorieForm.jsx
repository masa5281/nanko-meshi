// コンポーネント
import { SubmitButton } from "../Button/SubmitButton";
import { InputField } from "../InputField/InputField";
import { DateInput } from "./DateInput";
// モジュール
import { API_ENDPOINTS, ROUTES } from "../../utils/constants";
import { axiosClient } from "../../config/axiosClient";
import { createCalorieApi } from "../../api/calorieApi";
// ライブラリ
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// アイコン
import { MdAccessTimeFilled } from "react-icons/md";
// カスタムフック
import { useUserDataContext } from "../../context/UserDataContext";

export const MetsCalorieForm = () => {
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { register, watch, handleSubmit } = methods;
  const [dbMetsData, setDbMetsData] = useState("");
  const [recordedDate, setRecordedDate] = useState(new Date());
  const { dbUserData } = useUserDataContext();
  const navigate = useNavigate();

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
      console.error(error);
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(createMetsCalorie)}>
        <select
          defaultValue=""
          {...register("activityType")}
        >
          <option value="" disabled>運動項目を選択</option>
          {dbMetsData && dbMetsData.map((met) =>
            <option key={met.id} value={met.mets_value}>{met.activity_name}</option>
          )}
        </select>
        <InputField
          id="activeTime"
          type="text"
          placeholder="例：30"
          fieldName="activeTime"
          iconComponent={<MdAccessTimeFilled />}
          labelName="運動時間（分）"
        />
        <DateInput
          recordedDate={recordedDate}
          setRecordedDate={setRecordedDate}
        />
        <SubmitButton>食べ物に換算</SubmitButton>
      </form>
    </FormProvider>
  );
};
