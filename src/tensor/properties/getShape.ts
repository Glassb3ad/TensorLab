import { isScalar } from '@tensor/predicates/shapePredicates';
import { Tensor, Shape } from '@tensor/types';
import { tensorGuard } from '@tensor/tensorGuard';

const getShapeRec = (tensor: Tensor, shape: Shape = []): Shape => {
  if (isScalar(tensor)) {
    return shape;
  }
  return getShapeRec(tensor[0], [...shape, tensor.length]);
};

const getShapeRaw = (tensor: Tensor) => getShapeRec(tensor);
export const getShape = tensorGuard(getShapeRaw);
