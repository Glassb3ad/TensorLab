import { Tensor } from '../../tensor/types';
import { pointwise } from '../../tensor/pointwise-operations';
import { max } from '../../tensor/max';

export const invert = (tensor: Tensor) => {
  const maxValue = max(tensor) ?? 255;
  return pointwise(tensor, scalar => maxValue - scalar);
};
