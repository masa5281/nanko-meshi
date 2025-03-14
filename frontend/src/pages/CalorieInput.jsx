import { ManualCalorieForm } from "../components/CalorieInput/ManualCalorieForm";

export const CalorieInput = () => {
  return (
    <main className="h-screen">
      <div className="container mx-auto pt-12 text-center">
        <div className="mb-20">
          <h2 className="mb-2 text-text text-5xl font-bold gradient-marker">消費したカロリーを入力！</h2>
          <p className="text-text text-base font-bold">運動で消費したカロリーを食べ物の個数に換算できます！</p>
        </div>
        <div className="relative max-w-lg mx-auto pt-12 pb-10 border-slate-900 border-4 rounded-md before:content-[''] before:absolute before:w-56 before:h-10 before:bg-background before:inline-block before:-top-5 before:left-1/2 before:-translate-x-1/2">
          <p className="absolute -top-7 left-1/2 -translate-x-1/2 w-52 mx-auto mb-5 py-3 rounded-full bg-text text-white font-bold text-lg">直接入力する</p>
          <ManualCalorieForm />
        </div>
      </div>
    </main>
  );
}
