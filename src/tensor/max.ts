import { fold } from './recursive-operations';
import { Tensor } from './types';

export const max = (tensor: Tensor) => {
  return fold<number | null>(tensor, (agg, cur) => (agg !== null && agg >= cur ? agg : cur), null);
};
