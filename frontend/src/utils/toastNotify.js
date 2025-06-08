import { toast } from "react-toastify";

export const updateNotify = (message) => {
  toast.success(message);
};

export const verifyNotify = (message) => {
  toast.info(message);
};

export const deleteNotify = (message) => {
  toast.success(message);
};

export const passwordResetNotify = (message) => {
  toast.info(message);
};
