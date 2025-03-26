import { isScalar } from '@tensor/predicates/shapePredicates';
import { Tensor, Coordinates } from '@tensor/types';

export const getScalarAt = (tensor: Tensor, coordinates: Coordinates, fallback: number): number => {
  const keepSearching = coordinates.length !== 0;
  if (isScalar(tensor)) {
    return keepSearching ? fallback : tensor;
  }
  if (keepSearching) {
    const [firstCoordinate, ...lastCoordinates] = coordinates;
    const next = tensor[firstCoordinate];
    if (next) {
      return getScalarAt(next, lastCoordinates, fallback);
    }
  }
  return fallback;
};
