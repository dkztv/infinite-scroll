/**
 * Creates a debounced version of the provided function, delaying its execution
 * until after a specified wait time has elapsed since the last invocation.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The delay in milliseconds before the function is executed.
 * @returns {Function} A debounced version of the input function.
 *
 * @example
 * const debouncedLog = debounce((message) => console.log(message), 300);
 *
 * // This will only log "Hello" once, 300ms after the last call.
 * debouncedLog("Hello");
 * debouncedLog("Hello");
 * debouncedLog("Hello");
 */
export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  /**
   * Timeout ID for the currently scheduled invocation.
   * @type {number|null}
   */
  let timeout: number | null = null;

  /**
   * The debounced function.
   *
   * @param {...any[]} args - The arguments to pass to the original function.
   */
  return function (...args: unknown[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
