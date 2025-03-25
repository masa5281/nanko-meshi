import { FormProvider, useForm } from "react-hook-form";
import { SubmitButton } from "../Button/SubmitButton";
import { useEffect, useState } from "react";
import { axiosClient } from "../../config/axiosClient";
import { API_ENDPOINTS } from "../../utils/constants";

export const MetsCalorieForm = () => {
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });
  const { handleSubmit} = methods;
  const [dbMetsData, setDbMetsData] = useState("");

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
        <SubmitButton>食べ物に換算</SubmitButton>
      </form>
    </FormProvider>
  );
};
