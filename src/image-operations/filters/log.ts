import { max } from '@tensor/properties/max';
import { pointwise } from '@tensor/operations/pointwise';
import { Tensor } from '@tensor/types';
import { tensorGuard } from '@tensor/tensorGuard';

//Note: this function fails when tensors max value is zero
export const logRaw = (tensor: Tensor) => {
  const c = 255 / Math.log(1 + max(tensor));
  return pointwise(tensor, scalar => c * Math.log(1 + scalar));
};

export const log = tensorGuard(logRaw);
