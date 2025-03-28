import { isTensor } from './predicates/isTensor';

export const tensorGuard =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends (...args: Array<any>) => any>(func: T, checkCount = 1) =>
    (...args: Parameters<T>): ReturnType<T> => {
      for (let i = 0; i < checkCount; i++) {
        if (!isTensor(args[i])) {
          throw new TypeError(`Expected a Tensor at argument ${i.toString()}`);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return func(...args);
    };
