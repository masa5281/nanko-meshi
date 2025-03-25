import { useCloseModalContext } from "../RegisterdFoodList/RegisterdFoodItem";
import { IconWrapper } from "../IconWrapper";

export const CloseModalButton = ({children}) => {
  const closeModal = useCloseModalContext();

  return (
    <button
      onClick={() => closeModal()}
      className="absolute top-1 right-1 rounded-full transition-all duration-200 hover:bg-gray-200"
    >
      <IconWrapper size={30}>
        {children}
      </IconWrapper>
    </button>
  );
};
