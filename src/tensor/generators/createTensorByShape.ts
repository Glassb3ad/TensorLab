import { Shape, Tensor } from '@tensor/types';

export const createTensorByShape = (shape: Shape, defaultScalar = 0): Tensor => {
  if (shape.length === 0) {
    return defaultScalar;
  }
  const [first, ...rest] = shape;
  return Array(first)
    .fill(null)
    .map(() => createTensorByShape(rest, defaultScalar));
};
