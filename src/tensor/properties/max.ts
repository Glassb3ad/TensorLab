import { fold } from '@tensor/operations/fold';
import { Tensor } from '@tensor/types';

export const max = (tensor: Tensor) => {
  return fold<number | null>(tensor, (agg, cur) => (agg !== null && agg >= cur ? agg : cur), null);
};
