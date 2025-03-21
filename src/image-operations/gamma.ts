import { pointwise } from '../pointwise-operations';
import { Tensor } from '../tensor';

const normalize = (tensor: Tensor) => pointwise(tensor, scalar => scalar / 255);
const invertNormalize = (tensor: Tensor) => pointwise(tensor, scalar => scalar * 255);

export const gamma = (tensor: Tensor, power: number, c = 1.0) => {
  const gammatized = pointwise(normalize(tensor), scalar => c * Math.pow(scalar, power));
  return invertNormalize(gammatized);
};
