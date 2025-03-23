import { mapToZero } from '../../pointwise-operations';
import { fold, insert } from '../../recursive-operations';
import { Coordinates, Tensor } from '../../tensor';

export const geometricTransform = (tensor: Tensor, transformCoordinates: (coordinates: Coordinates) => Coordinates) => {
  const result = mapToZero(tensor);
  return fold<Tensor>(
    tensor,
    (agg: Tensor, cur: number, coordinates: Coordinates) => {
      const newCoordinates = transformCoordinates(coordinates);
      return insert(agg, cur, newCoordinates);
    },
    result,
  );
};
