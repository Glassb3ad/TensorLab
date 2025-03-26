import { Tensor } from '../../tensor/types';
import { pointwise } from '../../tensor/operations/pointwise';
import { max } from '../../tensor/properties/max';

export const invert = (tensor: Tensor) => {
  const maxValue = max(tensor) ?? 255;
  return pointwise(tensor, scalar => maxValue - scalar);
};
