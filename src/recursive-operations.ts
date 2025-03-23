import { Coordinates, isScalar, Tensor } from './tensor';

export const fold = <T>(
  tensor: Tensor,
  func: (agg: T, cur: number, coordinates: Coordinates) => T,
  agg: T,
  coordinates: Coordinates = [0],
): T => {
  if (isScalar(tensor)) {
    return func(agg, tensor, coordinates);
  }
  if (tensor.length === 0) {
    return agg;
  }
  const [fst, ...rest] = tensor;

  const moveVertically = !isScalar(fst);
  const newAgg = fold(fst, func, agg, moveVertically ? [...coordinates, 0] : coordinates);

  const firstCoordinates = coordinates.slice(0, -1);
  const lastCoordinate = coordinates[coordinates.length - 1];
  return fold(rest, func, newAgg, [...firstCoordinates, lastCoordinate + 1]);
};

export const max = (tensor: Tensor) => {
  return fold<number | null>(tensor, (agg, cur) => (agg !== null && agg >= cur ? agg : cur), null);
};

export const min = (tensor: Tensor) => {
  return fold<number | null>(tensor, (agg, cur) => (agg !== null && agg <= cur ? agg : cur), null);
};
