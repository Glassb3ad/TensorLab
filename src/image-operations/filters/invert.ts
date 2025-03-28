import { Scalar, Tensor } from '@tensor/types';
import { pointwiseRaw } from '@tensor/operations/pointwise';
import { max } from '@tensor/properties/max';
import { tensorGuard } from '@tensor/tensorGuard';

export const invertRaw = (image: Tensor) => {
  const transformPixel = (pixel: Scalar) => max(image) - pixel;
  return pointwiseRaw(image, transformPixel);
};

export const invert = tensorGuard(invertRaw);
