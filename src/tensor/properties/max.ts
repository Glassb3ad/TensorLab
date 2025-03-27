import { fold } from '@tensor/operations/fold';
import { Tensor } from '@tensor/types';
import { tensorGuard } from '../tensorGuard';
import { getFirstScalarRaw } from './getFirstScalar';

export const maxUnsafe = (tensor: Tensor) => {
  return fold<number>(tensor, (agg, cur) => (agg >= cur ? agg : cur), getFirstScalarRaw(tensor));
};

export const max = tensorGuard(maxUnsafe);
