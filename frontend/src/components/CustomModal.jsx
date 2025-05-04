import { motion } from "motion/react";
import Modal from 'react-modal';
import { modalStyle } from "../theme/modalStyle";

export const CustomModal = ({
  isOpen,
  title,
  children,
}) => {

  return (
    <Modal
      isOpen={isOpen}
      style={modalStyle}
      bodyOpenClassName="modal--open"
      className={"max-w-80 md:max-w-96 bg-white"}
      contentElement={(props, children) => (
        <motion.div
          {...props}
          initial={{ opacity: 0.5, scale: 0, x: "-50%", y: "-50%" }}
          animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    >
      <h3 className="inline-block w-full mb-3 text-2xl text-black font-bold">{title}</h3>
      {children}
    </Modal>
  );
};
