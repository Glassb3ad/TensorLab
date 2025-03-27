import { isScalar } from '../predicates';
import { tensorGuard } from '../tensorGuard';
import { Tensor } from '../types';

export const getFirstScalarRaw = (t: Tensor): number => {
  if (isScalar(t)) {
    return t;
  }
  return getFirstScalarRaw(t[0]);
};

export const getFirstScalar = tensorGuard(getFirstScalarRaw);
