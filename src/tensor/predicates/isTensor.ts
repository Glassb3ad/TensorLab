import { isEmpty } from '@/utils/array.utils';
import { Tensor } from '../types';

const haveSameLength = (arr: Array<unknown>) => {
  const lengths = arr.map(a => (Array.isArray(a) ? a.length : 0));
  return lengths.every(a => a === lengths[0]);
};

export const isTensor = (t: unknown): t is Tensor => {
  if (typeof t === 'number') {
    return true;
  }
  if (Array.isArray(t)) {
    if (isEmpty(t) || !haveSameLength(t)) {
      return false;
    }
    return t.every(a => isTensor(a));
  }
  return false;
};
