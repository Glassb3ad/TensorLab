import { Scalar, Tensor } from '@tensor/types';
import { pointwiseRaw } from '@tensor/operations/pointwise';
import { max } from '@tensor/properties/max';
import { tensorGuard } from '@tensor/tensorGuard';

export const invertRaw = (image: Tensor) => {
  const maxScalar = max(image);
  const transformPixel = (pixel: Scalar) => maxScalar - pixel;
  return pointwiseRaw(image, transformPixel);
};

export const invert = tensorGuard(invertRaw);
