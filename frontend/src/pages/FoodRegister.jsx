import { FoodRegisterForm } from "../components/FoodRegister/FoodRegisterForm";

export const FoodRegister = () => {
  return (
    <div className="relative max-w-lg mx-auto pt-12 pb-10 border-slate-900 border-4 rounded-md before:content-[''] before:absolute before:w-56 before:h-10 before:bg-background before:inline-block before:-top-5 before:left-1/2 before:-translate-x-1/2">
      <p className="absolute -top-7 left-1/2 -translate-x-1/2 w-52 mx-auto mb-5 py-3 rounded-full bg-text text-white font-bold text-lg text-center">食品を登録</p>
      <FoodRegisterForm />
    </div>
  );
};
