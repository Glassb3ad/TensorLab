import { tensorGuard } from '@tensor/tensorGuard';
import { insertRaw } from '@tensor/mutations/insert';
import { fold } from '@tensor/operations/fold';
import { mapToZero } from '@tensor/operations/mapToZero';
import { Coordinates, Tensor } from '@tensor/types';

const geometricTransformRaw = (tensor: Tensor, transformCoordinates: (coordinates: Coordinates) => Coordinates) => {
  const result = mapToZero(tensor);
  return fold<Tensor>(
    tensor,
    (agg: Tensor, cur: number, coordinates: Coordinates) => {
      const newCoordinates = transformCoordinates(coordinates);
      if (newCoordinates.every(coordinate => coordinate >= 0)) {
        return insertRaw(agg, cur, newCoordinates);
      }
      return agg;
    },
    result,
  );
};

export const geometricTransform = tensorGuard(geometricTransformRaw);
