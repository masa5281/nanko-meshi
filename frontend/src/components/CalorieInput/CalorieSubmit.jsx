export const CalorieSubmit = (props) => {
  const { onClick } = props;

  return (
    <button
      className="inline-block relative mx-auto px-12 py-3 border-slate-900 border-2 rounded-full bg-primary text-white font-bold hover:bg-hover"
      onClick={onClick}
    >
      食べ物に換算
    </button>
  );
}
