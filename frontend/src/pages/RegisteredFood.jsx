import { FormProvider, useForm } from "react-hook-form";
import { MyRegisteredFood } from "../components/RegisterdFood/MyRegisteredFood";
import { AllRegisteredFood } from "../components/RegisterdFood/AllRegisteredFood";

export const RegisteredFood = () => {
  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl mx-auto text-center">
        <div className="relative flex gap-8 justify-center w-80 py-3 mb-8 mx-auto bg-white rounded-full text-xl">
          <p>登録した食品</p>
          <p>みんなの食品</p>
          <span className="absolute w-20 h-8 bg-primary"></span>
        </div>

        <MyRegisteredFood />
        <AllRegisteredFood />
      </div>
    </FormProvider>
  );
};
