// コンポーネント
import { SubmitButton } from "../Button/SubmitButton";
import { InputField } from "../InputField/InputField";
import { DateInput } from "./DateInput";
// モジュール
import { API_ENDPOINTS } from "../../utils/constants";
import { axiosClient } from "../../config/axiosClient";
// ライブラリ
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
// アイコン
import { MdAccessTimeFilled } from "react-icons/md";

export const MetsCalorieForm = () => {
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { handleSubmit } = methods;
  const [dbMetsData, setDbMetsData] = useState("");
  const [recordedDate, setRecordedDate] = useState(new Date());

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

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit()}>
        <select>
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
