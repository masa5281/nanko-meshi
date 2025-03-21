import { IconContext } from "react-icons/lib";
import { useCloseModalContext } from "../RegisterdFoodList/RegisterdFoodItem";

export const CloseModalButton = ({children}) => {
  const closeModal = useCloseModalContext();

  return (
    <button
      onClick={() => closeModal()}
      className="absolute top-1 right-1 rounded-full transition-all duration-200 hover:bg-gray-200"
    >
      <IconContext.Provider value={{ size: 30 }}>
        {children}
      </IconContext.Provider>
    </button>
  );
};
