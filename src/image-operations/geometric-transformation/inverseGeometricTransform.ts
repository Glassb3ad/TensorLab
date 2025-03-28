// TODO: Rethink how to do this
import { insertRaw } from '@tensor/mutations/insert';
import { fold } from '@tensor/operations/fold';
import { Coordinates, Tensor } from '@tensor/types';
import { getScalarAtRaw } from '@tensor/properties/getScalarAt';
import { createTensorByShape } from '@/tensor/generators/createTensorByShape';
import { mapToZero } from '@tensor/operations/mapToZero';
import { tensorGuard } from '@/tensor/tensorGuard';

const resizeTensor = (tensor: Tensor, transform: (coordinates: Coordinates) => Coordinates) => {
  const maxCoordinates = fold<Coordinates>(
    tensor,
    (agg: Coordinates, _cur: number, coordinates: Coordinates) => {
      const newCoordinates = transform(coordinates);
      return agg.map((coor, i) => Math.max(coor, newCoordinates[i]));
    },
    [0, 0],
  );
  // add 1 to max coordinates to get dimeansiont since length = max coordinate + 1
  const shape = maxCoordinates.map(a => a + 1);
  return createTensorByShape(shape, 255);
};

const inverseGeometricTransformRaw = (
  tensor: Tensor,
  transformCoordinates: (coordinates: Coordinates) => Coordinates,
  inverseTransformCoordinates?: (coordinates: Coordinates) => Coordinates,
  fallback = 0,
) => {
  const aggTensor = inverseTransformCoordinates
    ? resizeTensor(mapToZero(tensor), inverseTransformCoordinates)
    : mapToZero(tensor);
  return fold<Tensor>(
    aggTensor,
    (agg: Tensor, _cur: number, coordinates: Coordinates) => {
      const locationInTensor = transformCoordinates(coordinates);
      if (locationInTensor.every(coordinate => coordinate >= 0)) {
        const scalar = getScalarAtRaw(tensor, locationInTensor, fallback);
        return insertRaw(agg, scalar, coordinates);
      }
      return agg;
    },
    aggTensor,
  );
};

export const inverseGeometricTransform = tensorGuard(inverseGeometricTransformRaw);
