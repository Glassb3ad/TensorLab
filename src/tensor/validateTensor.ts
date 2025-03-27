import { isTensor } from './predicates/isTensor';

export const validateTensor =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends (...args: Array<any>) => any>(func: T) =>
    (...args: Parameters<T>): ReturnType<T> => {
      if (!isTensor(args[0])) {
        throw new TypeError(`Expected a Tensor, but received ${typeof args[0]}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return func(...args);
    };
