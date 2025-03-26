import { isMatrix } from '../../tensor/tensor';
import { Coordinates, Tensor } from '../../tensor/types';
import { geometricTransform } from './geometricTransform';

export const horizontalFlip = (image: Tensor) => {
  if (!isMatrix(image)) {
    return image;
  }
  const matrixWidth = image[0].length;
  const move = ([y, x]: Coordinates) => [y, matrixWidth - x - 1];
  return geometricTransform(image, move);
};
