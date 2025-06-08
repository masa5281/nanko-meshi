import { ToastContainer } from "react-toastify";

export const ToastProvider = ({ children }) => {

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={true}
        theme="colored"
      />
      {children}
    </>
  );
};
