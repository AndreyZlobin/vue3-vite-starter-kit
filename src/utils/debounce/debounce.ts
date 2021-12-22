export function debounce(fn: (...arg: any[]) => any, wait: number): (...args: any[]) => void {
  let timeout: null | number = null;
  const timer = wait;
  const debounced = function (...args: any[]): void {
    const later = (): void => {
      timeout = null;

      fn.apply(this, args);
    };
    clearTimeout(Number(timeout));
    timeout = setTimeout(later, timer);
    if (!timeout) {
      fn.apply(this, args);
    }
  };
  debounced.cancel = () => {
    clearTimeout(Number(timeout));
    timeout = null;
  };
  return debounced;
}
