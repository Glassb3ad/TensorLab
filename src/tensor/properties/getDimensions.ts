import { isScalar } from '../shapePredicates';
import { Tensor, Dimensions } from '../types';

const getDimensionsRec = (tensor: Tensor | undefined, dimensions: Dimensions = []): Dimensions => {
  if (!tensor || isScalar(tensor)) {
    return dimensions;
  }
  return getDimensionsRec(tensor[0], [...dimensions, tensor.length]);
};

export const getDimensions = (tensor: Tensor) => getDimensionsRec(tensor);
