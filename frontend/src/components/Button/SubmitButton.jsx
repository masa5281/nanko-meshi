export const SubmitButton = ({
  children,
  className = "",
  onClick,
}) => {

  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${className} inline-block relative mx-auto px-[54px] py-2 border-black border-2 rounded-full bg-primary text-white font-bold hover:bg-hover`}
    >
      {children}
    </button>
  );
};
