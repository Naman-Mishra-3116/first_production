import { toast } from "react-toastify";

export const createToast = function (message, type) {
  if (type === "error") {
    toast.error(message);
  } else if (type === "success") {
    toast.success(message);
  } else if (type === "warning") {
    toast.warn(message);
  } else if (type === "info") {
    toast.info(message);
  } else {
    toast(message);
  }
};
