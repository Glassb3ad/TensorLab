import { isScalar } from '@tensor/predicates/shapePredicates';
import { Tensor, Shape } from '@tensor/types';

const getShapeRec = (tensor: Tensor | undefined, shape: Shape = []): Shape => {
  if (!tensor || isScalar(tensor)) {
    return shape;
  }
  return getShapeRec(tensor[0], [...shape, tensor.length]);
};

export const getShape = (tensor: Tensor) => getShapeRec(tensor);
