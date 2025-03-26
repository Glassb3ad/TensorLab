import { mapToZero } from '../../tensor/pointwise-operations';
import { fold, insert } from '../../tensor/recursive-operations';
import { Coordinates, Tensor } from '../../tensor/tensor';

export const geometricTransform = (tensor: Tensor, transformCoordinates: (coordinates: Coordinates) => Coordinates) => {
  const result = mapToZero(tensor);
  return fold<Tensor>(
    tensor,
    (agg: Tensor, cur: number, coordinates: Coordinates) => {
      const newCoordinates = transformCoordinates(coordinates);
      if (newCoordinates.every(coordinate => coordinate >= 0)) {
        return insert(agg, cur, newCoordinates);
      }
      return agg;
    },
    result,
  );
};
