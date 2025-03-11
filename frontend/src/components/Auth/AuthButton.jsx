export const AuthButton = (props) => {
  const {
    children,
    className = ""
  } = props;

  return (
    <button
      type="submit"
      className={`inline-block py-1 border-2 border-white rounded-full bg-primary text-white text-xl hover:bg-hover ${className}`}
    >
      {children}
    </button>
  );
};
