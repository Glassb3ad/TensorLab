import { Tensor } from '../types';

type MightBeTensor = Array<MightBeTensor> | number;

export const isTensor = (t: MightBeTensor): t is Tensor => {
  if (typeof t === 'number') {
    return true;
  }
  if (Array.isArray(t)) {
    const empty = t.length === 0;
    const elementsHaveSameLength = new Set(t.map(a => (Array.isArray(a) ? a.length : 0))).size === 1;
    if (empty || !elementsHaveSameLength) {
      return false;
    }
    return t.every(a => isTensor(a));
  }
  return false;
};
