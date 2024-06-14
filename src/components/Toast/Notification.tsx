import { toast, ToastContent } from "react-toastify";

export const NotifySuccess = (message: ToastContent) => {
  toast.success(message, {
    theme: "light",
  });
};

export const NotifyError = (message: ToastContent) => {
  toast.error(message, {
    theme: "light",
  });
};

export const NotifyWarning = (message: ToastContent) => {
  toast.warning(message, {
    theme: "light",
  });
};
