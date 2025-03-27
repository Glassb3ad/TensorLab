import { tensorGuard } from '@tensor/tensorGuard';
import { pointwise } from '@tensor/operations/pointwise';
import { Tensor } from '@tensor/types';

const normalize = (tensor: Tensor) => pointwise(tensor, scalar => scalar / 255);
const invertNormalize = (tensor: Tensor) => pointwise(tensor, scalar => scalar * 255);

export const gammaRaw = (tensor: Tensor, power: number, c = 1.0) => {
  const gammatized = pointwise(normalize(tensor), scalar => c * Math.pow(scalar, power));
  return invertNormalize(gammatized);
};

export const gamma = tensorGuard(gammaRaw);
