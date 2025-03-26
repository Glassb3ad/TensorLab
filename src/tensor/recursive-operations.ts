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

const pushToTensorArray = (tensor: Array<Tensor>, coordinates: Coordinates, value: Tensor): Array<Tensor> => {
  if (coordinates.length === 1) {
    return [...tensor, value];
  }

  const index = coordinates[0];
  if (Array.isArray(tensor[index])) {
    return [...tensor.slice(0, -1), pushToTensorArray(tensor[index], coordinates.slice(1), value)];
  }

  return [...tensor, pushToTensorArray([], coordinates.slice(1), value)];
};

export const map = (tensor: Tensor, mapFunc: (cur: number, coordinates: Coordinates) => Tensor): Tensor => {
  const foldFunc = (agg: Array<Tensor>, cur: number, coordinates: Coordinates) => {
    return pushToTensorArray(agg, coordinates, mapFunc(cur, coordinates));
  };
  return fold<Array<Tensor>>(tensor, foldFunc, []);
};

export const max = (tensor: Tensor) => {
  return fold<number | null>(tensor, (agg, cur) => (agg !== null && agg >= cur ? agg : cur), null);
};

export const min = (tensor: Tensor) => {
  return fold<number | null>(tensor, (agg, cur) => (agg !== null && agg <= cur ? agg : cur), null);
};
