export const debounce = (
  func: Function,
  wait: number,
): ((...args: any[]) => void) => {
  let timeout: number = null;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
