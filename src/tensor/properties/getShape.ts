import { isScalar } from '@tensor/predicates/shapePredicates';
import { Tensor, Shape } from '@tensor/types';
import { tensorGuard } from '../tensorGuard';

const getShapeRec = (tensor: Tensor | undefined, shape: Shape = []): Shape => {
  if (!tensor || isScalar(tensor)) {
    return shape;
  }
  return getShapeRec(tensor[0], [...shape, tensor.length]);
};

const getShapeUnsafe = (tensor: Tensor) => getShapeRec(tensor);
export const getShape = tensorGuard(getShapeUnsafe);
