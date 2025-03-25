export const SubmitButton = (props) => {
  const {
    children,
    className = "",
    notifyClick,
  } = props;

  return (
    <button
      type="submit"
      onClick={notifyClick}
      className={`inline-block relative mx-auto px-[54px] py-2 border-black border-2 rounded-full bg-primary text-white font-bold hover:bg-hover ${className}`}
    >
      {children}
    </button>
  );
};
