import { isScalar } from '@tensor/predicates/shapePredicates';
import { Tensor, Coordinates } from '@tensor/types';
import { tensorGuard } from '../tensorGuard';

export const getScalarAtRaw = (tensor: Tensor, coordinates: Coordinates, fallback: number): number => {
  const keepSearching = coordinates.length !== 0;
  if (isScalar(tensor)) {
    return keepSearching ? fallback : tensor;
  }
  if (keepSearching) {
    const [firstCoordinate, ...lastCoordinates] = coordinates;
    const next = tensor[firstCoordinate];
    if (next) {
      return getScalarAtRaw(next, lastCoordinates, fallback);
    }
  }
  return fallback;
};

export const getScalarAt = tensorGuard(getScalarAtRaw);
