import { createToast } from "~/libs/toastify";
import { Toast } from "~/types";

const toast: Toast = {
  success(message, timeout = 2000) {
    createToast(message, { timeout: timeout, type: "success" });
  },
  error(message, timeout = 2000) {
    createToast(message, { timeout: timeout, type: "danger" });
  },
  info(message, timeout = 2000) {
    createToast(message, { timeout: timeout, type: "info" });
  },
  warn(message, timeout = 2000) {
    createToast(message, { timeout: timeout, type: "warning" });
  },
};
export { toast };
