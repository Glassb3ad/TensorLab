import { isMatrix } from '@tensor/predicates/shapePredicates';
import { Coordinates, Tensor } from '@tensor/types';
import { geometricTransform } from './geometricTransform';
import { tensorGuard } from '@/tensor/tensorGuard';

export const horizontalFlipRaw = (image: Tensor) => {
  if (!isMatrix(image)) {
    return image;
  }
  const matrixWidth = image[0].length;
  const move = ([y, x]: Coordinates) => [y, matrixWidth - x - 1];
  return geometricTransform(image, move);
};

export const horizontalFlip = tensorGuard(horizontalFlipRaw);
