import { isMatrix } from '@tensor/predicates/shapePredicates';
import { Coordinates, Tensor } from '@tensor/types';
import { geometricTransform } from './geometricTransform';
import { tensorGuard } from '@tensor/tensorGuard';

export const translateRaw = (image: Tensor, horizontalChange: number, verticalChange: number) => {
  if (!isMatrix(image)) {
    return image;
  }
  const move = ([y, x]: Coordinates) => [y + verticalChange, x + horizontalChange];
  return geometricTransform(image, move);
};

export const translate = tensorGuard(translateRaw);
