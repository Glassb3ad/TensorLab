import { tensorGuard } from '@tensor/tensorGuard';
import { pointwiseRaw } from '@tensor/operations/pointwise';
import { Scalar, Tensor } from '@tensor/types';

const normalize = (tensor: Tensor) => pointwiseRaw(tensor, scalar => scalar / 255);
const invertNormalize = (tensor: Tensor) => pointwiseRaw(tensor, scalar => scalar * 255);

export const gammaRaw = (tensor: Tensor, gamma: number, c = 1.0) => {
  const transformPixel = (scalar: Scalar) => c * Math.pow(scalar, gamma);
  const gammatized = pointwiseRaw(normalize(tensor), transformPixel);
  return invertNormalize(gammatized);
};

export const gamma = tensorGuard(gammaRaw);
