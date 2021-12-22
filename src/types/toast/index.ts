export type ToastHandler = (message: string, timeout?: number) => void;

export interface Toast {
  success: ToastHandler;
  error: ToastHandler;
  info: ToastHandler;
  warn: ToastHandler;
}
