import { fold } from '@tensor/operations/fold';
import { Tensor } from '@tensor/types';
import { tensorGuard } from '../tensorGuard';

export const maxUnsafe = (tensor: Tensor) => {
  return fold<number | null>(tensor, (agg, cur) => (agg !== null && agg >= cur ? agg : cur), null);
};

export const max = tensorGuard(maxUnsafe);
