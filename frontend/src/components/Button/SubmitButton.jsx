export const SubmitButton = (props) => {
  const {
    children,
    className = ""
  } = props;

  return (
    <button
      type="submit"
      className={`inline-block relative mx-auto px-12 py-2 border-slate-900 border-2 rounded-full bg-primary text-white font-bold hover:bg-hover ${className}`}
    >
      {children}
    </button>
  );
};
