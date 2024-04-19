import { toast, type ToastOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export const toastError = (text: string): void => {
  toast(`${text}`, {
    theme: "auto",
    type: "error",
    dangerouslyHTMLString: true,
  } as ToastOptions);
};

export const toastSuccess = (text: string): void => {
  toast(`${text}`, {
    theme: "auto",
    type: "success",
    dangerouslyHTMLString: true,
  } as ToastOptions);
};
