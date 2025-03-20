import { RegisterdFoodItem } from "../components/RegisterdFoodList/RegisterdFoodItem";
import { ValidateErrorProvider } from "../context/ValidateErrorContext";

export const RegisterdFood = () => {
  return (
    <ValidateErrorProvider>
      <RegisterdFoodItem />
    </ValidateErrorProvider>
  );
};
