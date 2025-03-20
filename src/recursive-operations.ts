import { isScalar, Tensor } from './tensor';

export const fold = <T>(tensor: Tensor, func: (agg: T, cur: number) => T, agg: T): T => {
  if (isScalar(tensor)) {
    return func(agg, tensor);
  }
  if (tensor.length === 0) {
    return agg;
  }
  const [fst, ...rest] = tensor;
  const newAgg = fold(fst, func, agg);
  return fold(rest, func, newAgg);
};

export const max = (tensor: Tensor) => {
  return fold<number | null>(tensor, (agg, cur) => (agg && agg >= cur ? agg : cur), null);
};

export const min = (tensor: Tensor) => {
  return fold<number | null>(tensor, (agg, cur) => (agg && agg <= cur ? agg : cur), null);
};
