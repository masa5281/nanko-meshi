export const AuthSubmitButton = (props) => {
  const {
    children,
    className = ""
  } = props;

  return (
    <button
      type="submit"
      className={`${className} inline-block py-1 border-2 border-white rounded-full bg-primary text-white text-base md:text-xl hover:bg-hover`}
    >
      {children}
    </button>
  );
};
