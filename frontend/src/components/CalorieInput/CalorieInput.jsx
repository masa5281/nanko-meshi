import { ManualCalorieForm } from "./ManualCalorieForm";

export const CalorieInput = () => {
  return (
    <main className="h-screen">
      <div className="container mx-auto pt-12 text-center">
        <div className="mb-20">
          <h2 className="text-5xl font-bold mb-2 text-text gradient-marker">消費したカロリーを入力！</h2>
          <p className="text-base font-bold text-text">運動で消費したカロリーを食べ物の個数に換算できます！</p>
        </div>
        <ManualCalorieForm />
      </div>
    </main>
  );
}

