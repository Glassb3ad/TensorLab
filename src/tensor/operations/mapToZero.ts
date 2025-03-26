import { Tensor } from '../types';
import { pointwise } from './pointwise';

export const mapToZero = (tensor: Tensor): Tensor => {
  return pointwise(tensor, () => 0);
};
