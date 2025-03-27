import { fold } from '@tensor/operations/fold';
import { Tensor } from '@tensor/types';
import { tensorGuard } from '@tensor/tensorGuard';
import { getFirstScalarRaw } from './getFirstScalar';

export const minUnsafe = (tensor: Tensor) => {
  return fold<number>(tensor, (agg, cur) => (agg <= cur ? agg : cur), getFirstScalarRaw(tensor));
};

export const min = tensorGuard(minUnsafe);
