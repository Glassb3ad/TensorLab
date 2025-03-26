import { pointwise } from '../pointwise-operations';
import { Tensor } from '../types';

export const mapToZero = (tensor: Tensor): Tensor => {
  return pointwise(tensor, () => 0);
};
