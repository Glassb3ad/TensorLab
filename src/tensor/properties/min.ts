import { fold } from '@tensor/operations/fold';
import { Tensor } from '@tensor/types';
import { tensorGuard } from '@tensor/tensorGuard';

export const minUnsafe = (tensor: Tensor) => {
  return fold<number | null>(tensor, (agg, cur) => (agg !== null && agg <= cur ? agg : cur), null);
};

export const min = tensorGuard(minUnsafe);
