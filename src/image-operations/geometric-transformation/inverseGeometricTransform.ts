import { mapToZero } from '../../pointwise-operations';
import { fold, insert } from '../../recursive-operations';
import { Coordinates, getScalarAt, Tensor } from '../../tensor';

export const inverseGeometricTransform = (
  tensor: Tensor,
  transformCoordinates: (coordinates: Coordinates) => Coordinates,
  fallback: number,
) => {
  const result = mapToZero(tensor);
  return fold<Tensor>(
    result,
    (agg: Tensor, _cur: number, coordinates: Coordinates) => {
      const locationInTensor = transformCoordinates(coordinates);
      if (locationInTensor.every(coordinate => coordinate >= 0)) {
        const scalar = getScalarAt(tensor, locationInTensor, fallback);
        return insert(agg, scalar, coordinates);
      }
      return agg;
    },
    result,
  );
};
