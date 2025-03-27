import { isScalar, isVector } from '@tensor/predicates/shapePredicates';
import { Coordinates, Tensor } from '@tensor/types';

export const fold = <T>(
  tensor: Tensor,
  func: (acc: T, cur: number, coordinates: Coordinates) => T,
  acc: T,
  coordinates: Coordinates = [],
): T => {
  if (isScalar(tensor)) {
    return func(acc, tensor, coordinates);
  }
  const moveHorizontally = isVector(tensor);
  if (moveHorizontally) {
    return tensor.reduce((acc2, cur, i) => fold<T>(cur, func, acc2, [...coordinates, i]), acc);
  } else {
    return tensor.reduce((acc2, cur, i) => fold<T>(cur, func, acc2, [...coordinates, i]), acc);
  }
};
