import { pointwise } from '../tensor/pointwise-operations';
import { max } from '../tensor/recursive-operations';
import { Tensor } from '../tensor/types';

//Note: this function fails when tensors max value is zero
export const log = (tensor: Tensor) => {
  const c = 255 / Math.log(1 + (max(tensor) ?? 1));
  return pointwise(tensor, scalar => c * Math.log(1 + scalar));
};
