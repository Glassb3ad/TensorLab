import { pointwise } from '../pointwise-operations';
import { Tensor } from '../tensor';
import { max } from '../recursive-operations';

export const invert = (tensor: Tensor) => {
  const maxValue = max(tensor) ?? 255;
  return pointwise(tensor, scalar => maxValue - scalar);
};
