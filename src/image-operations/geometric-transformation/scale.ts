import { isMatrix } from '@tensor/predicates/shapePredicates';
import { Coordinates, Tensor } from '@tensor/types';
import { inverseGeometricTransform } from './inverseGeometricTransform';
import { tensorGuard } from '@tensor/tensorGuard';

const nearestNeighborInterpolation = (coordinates: Coordinates) => coordinates.map(Math.round);

const transform = (sx: number, sy: number) => (coordinates: Coordinates) => {
  return nearestNeighborInterpolation([coordinates[0] / sy, coordinates[1] / sx]);
};

const inverseTransform = (sx: number, sy: number) => (coordinates: Coordinates) => {
  return nearestNeighborInterpolation([coordinates[0] * sy, coordinates[1] * sx]);
};

export const scaleRaw = (tensor: Tensor, sx: number, sy: number, resize = true, fallback = 0) => {
  if (isMatrix(tensor)) {
    return inverseGeometricTransform(
      tensor,
      transform(sx, sy),
      resize ? inverseTransform(sx, sy) : undefined,
      fallback,
    );
  }
  return tensor;
};

export const scale = tensorGuard(scaleRaw);
