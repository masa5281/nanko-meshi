import { ClipLoader } from "react-spinners";

export const SubmitButton = ({
  children,
  className = "",
  onClick,
  isLoading,
}) => {

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isLoading}
      className={`${className} inline-block relative mx-auto px-[54px] py-2 border-black border-2 rounded-full bg-primary text-white font-bold hover:bg-hover`}
    >
      {isLoading ? <ClipLoader loading={isLoading} size={16} /> : children}
    </button>
  );
};
