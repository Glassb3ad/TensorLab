import { Tensor } from '../tensor/types';
import { max } from '../tensor/recursive-operations';
import { pointwise } from '../tensor/pointwise-operations';

export const invert = (tensor: Tensor) => {
  const maxValue = max(tensor) ?? 255;
  return pointwise(tensor, scalar => maxValue - scalar);
};
