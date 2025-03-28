import { max } from '@tensor/properties/max';
import { pointwiseRaw } from '@tensor/operations/pointwise';
import { Scalar, Tensor } from '@tensor/types';
import { tensorGuard } from '@tensor/tensorGuard';

//Note: this function fails when tensors max value is zero
export const logRaw = (tensor: Tensor) => {
  const c = 255 / Math.log(1 + max(tensor));
  const transformPixel = (pixel: Scalar) => c * Math.log(1 + pixel);
  return pointwiseRaw(tensor, transformPixel);
};

export const log = tensorGuard(logRaw);
