import { FormProvider, useForm } from "react-hook-form";
import { RegisterdFoodItem } from "../components/RegisterdFoodList/RegisterdFoodItem";

export const RegisterdFood = () => {
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });

  return (
    <FormProvider {...methods}>
      <RegisterdFoodItem />
    </FormProvider>
  );
};
