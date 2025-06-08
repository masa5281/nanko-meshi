import { IoIosClose } from "react-icons/io";
import { IconProvider } from "../IconProvider";

export const CloseModalButton = ({ closeUserModal }) => {
  return (
    <button
      onClick={closeUserModal}
      className="absolute top-1 right-1 rounded-full transition-all duration-200 hover:bg-gray-200"
    >
      <IconProvider size={30}>
        <IoIosClose />
      </IconProvider>
    </button>
  );
};
