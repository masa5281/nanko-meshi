import { FoodRegisterForm } from "../components/FoodRegister/FoodRegisterForm";
import { ValidateErrorProvider } from "../context/ValidateErrorContext";

export const FoodRegister = () => {
  return (
    <div className="relative top-8 max-w-md mx-auto pt-12 pb-10 border-black border-4 rounded-md before:content-[''] before:absolute before:w-56 before:h-10 before:bg-background before:inline-block before:-top-5 before:left-1/2 before:-translate-x-1/2">
      <p className="absolute -top-7 left-1/2 -translate-x-1/2 w-52 mx-auto mb-5 py-2 rounded-full bg-black text-white text-2xl text-center">食品を登録</p>
      <ValidateErrorProvider>
        <FoodRegisterForm />
      </ValidateErrorProvider>
    </div>
  );
};
