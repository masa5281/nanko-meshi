import { useCloseModalContext } from "../RegisterdFoodList/RegisterdFoodItem";
import { IconProvider } from "../IconProvider";

export const CloseModalButton = ({children}) => {
  const closeModal = useCloseModalContext();

  return (
    <button
      onClick={() => closeModal()}
      className="absolute top-1 right-1 rounded-full transition-all duration-200 hover:bg-gray-200"
    >
      <IconProvider size={30}>
        {children}
      </IconProvider>
    </button>
  );
};
