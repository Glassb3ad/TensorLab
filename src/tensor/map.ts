import { fold } from './recursive-operations';
import { Tensor, Coordinates } from './types';

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
