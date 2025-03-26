import { insert } from '@tensor/mutations/insert';
import { fold } from '@tensor/operations/fold';
import { Coordinates, Tensor } from '@tensor/types';
import { getScalarAt } from '@tensor/properties/getScalarAt';
import { createTensorByDimensions } from '@tensor/generators/createTensorByDimensions';
import { mapToZero } from '@tensor/operations/mapToZero';

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
  const dimensions = maxCoordinates.map(a => a + 1);
  return createTensorByDimensions(dimensions, 255);
};

export const inverseGeometricTransform = (
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
        const scalar = getScalarAt(tensor, locationInTensor, fallback);
        return insert(agg, scalar, coordinates);
      }
      return agg;
    },
    aggTensor,
  );
};
