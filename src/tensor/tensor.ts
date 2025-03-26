import { haveEqualShape, isScalar } from './shapePredicates';
import { Coordinates, Dimensions, Tensor } from './types';

type TensorArg = Array<TensorArg> | number;

export const createTensorFromArray = (tensor: TensorArg): Tensor => {
  //TODO check that arrays have the same length
  return tensor;
};

export const getDimensionsRec = (tensor: Tensor | undefined, dimensions: Dimensions = []): Dimensions => {
  if (!tensor || isScalar(tensor)) {
    return dimensions;
  }
  return getDimensionsRec(tensor[0], [...dimensions, tensor.length]);
};

export const createTensorByDimensions = (dimensions: Dimensions, defaultScalar = 0): Tensor => {
  if (dimensions.length === 0) {
    return defaultScalar;
  }
  const [first, ...rest] = dimensions;
  return Array(first)
    .fill(null)
    .map(() => createTensorByDimensions(rest, defaultScalar));
};

export const getDimensions = (tensor: Tensor) => getDimensionsRec(tensor);

export const getScalarAt = (tensor: Tensor, coordinates: Coordinates, fallback: number): number => {
  const keepSearching = coordinates.length !== 0;
  if (isScalar(tensor)) {
    return keepSearching ? fallback : tensor;
  }
  if (keepSearching) {
    const [firstCoordinate, ...lastCoordinates] = coordinates;
    const next = tensor[firstCoordinate];
    if (next) {
      return getScalarAt(next, lastCoordinates, fallback);
    }
  }
  return fallback;
};

export const add = (t1: Tensor, t2: Tensor): Tensor => {
  if (!haveEqualShape(t1, t2)) {
    throw new Error('tensors have unequal dimensions');
  }
  if (Array.isArray(t1) && Array.isArray(t2)) {
    return t1.map((tensor, index) => add(tensor, t2[index]));
  }
  return (t1 as number) + (t2 as number);
};
