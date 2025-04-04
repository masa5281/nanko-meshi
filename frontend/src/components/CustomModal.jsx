import { motion } from "motion/react";
import Modal from 'react-modal';
import { modalStyle } from "../theme/modalStyle";

export const CustomModal = ({
  isOpen,
  children,
}) => {

  return (
    <Modal
      isOpen={isOpen}
      style={modalStyle}
      bodyOpenClassName="modal--open"
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
      {children}
    </Modal>
  );
};
