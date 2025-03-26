import { Dimensions, Tensor } from './types';

export const createTensorByDimensions = (dimensions: Dimensions, defaultScalar = 0): Tensor => {
  if (dimensions.length === 0) {
    return defaultScalar;
  }
  const [first, ...rest] = dimensions;
  return Array(first)
    .fill(null)
    .map(() => createTensorByDimensions(rest, defaultScalar));
};
