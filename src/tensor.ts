type TensorArg = Array<TensorArg> | number;

export type Tensor = Array<Tensor> | number;

export type Coordinates = Array<number>;

export type Dimensions = Array<number>;

export const createTensorFromArray = (tensor: TensorArg): Tensor => {
  //TODO check that arrays have the same length
  return tensor;
};

export const isScalar = (t: Tensor) => typeof t === 'number';

export const isVector = (t: Tensor) => !isScalar(t) && isScalar(t[0]);

export const isMatrix = (t: Tensor): t is Array<Array<Tensor>> => !isScalar(t) && isVector(t[0]);

export const is3D = (t: Tensor) => !isScalar(t) && isMatrix(t[0]);

export const getDimensionsRec = (tensor: Tensor | undefined, dimensions: Dimensions = []): Dimensions => {
  if (!tensor || isScalar(tensor)) {
    return dimensions;
  }
  return getDimensionsRec(tensor[0], [...dimensions, tensor.length]);
};

export const getDimensions = (tensor: Tensor) => getDimensionsRec(tensor);

export const equalShape = (t1: Tensor, t2: Tensor): boolean => {
  if (isScalar(t1) && isScalar(t2)) {
    return true;
  }
  if (isScalar(t1) || isScalar(t2)) {
    return false;
  }
  if (t1.length !== t2.length) {
    return false;
  }
  return equalShape(t1[0], t2[0]);
};

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
  if (!equalShape(t1, t2)) {
    throw new Error('tensors have unequal dimensions');
  }
  if (Array.isArray(t1) && Array.isArray(t2)) {
    return t1.map((tensor, index) => add(tensor, t2[index]));
  }
  return (t1 as number) + (t2 as number);
};

const dotProductRec = (t1: Tensor, t2: Tensor): Tensor => {
  if (Array.isArray(t1) && Array.isArray(t2)) {
    const sum = t1.reduce((pre, cur, index) => (dotProductRec(cur, t2[index]) as number) + (pre as number), 0);
    return sum;
  }
  return (t1 as number) * (t2 as number);
};

export const dotProduct = (t1: Tensor, t2: Tensor): Tensor => {
  if (!equalShape(t1, t2)) {
    throw new Error('tensors must have same dimensions');
  }
  return dotProductRec(t1, t2);
};
