import { isScalar, isVector } from '@tensor/predicates/shapePredicates';
import { Tensor, Coordinates } from '@tensor/types';
import { tensorGuard } from '@tensor/tensorGuard';

const insertRec = (tensor: Tensor, value: number, insertTo: Coordinates) => {
  if (!tensor || isScalar(tensor)) {
    return;
  }
  const [index, ...rest] = insertTo;

  if (rest.length === 0 && isVector(tensor) && index < tensor.length) {
    tensor[index] = value;
    return;
  }
  insertRec(tensor[index], value, rest);
};

export const insertRaw = (tensor: Tensor, value: number, insertTo: Coordinates) => {
  insertRec(tensor, value, insertTo);
  return tensor;
};

export const insert = tensorGuard(insertRaw);
