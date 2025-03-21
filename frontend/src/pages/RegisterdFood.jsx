import { FormProvider, useForm } from "react-hook-form";
import { RegisterdFoodItem } from "../components/RegisterdFoodList/RegisterdFoodItem";
import { ValidateErrorProvider } from "../context/ValidateErrorContext";

export const RegisterdFood = () => {
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });

  return (
    <FormProvider {...methods}>
      <ValidateErrorProvider>
        <RegisterdFoodItem />
      </ValidateErrorProvider>
    </FormProvider>
  );
};
