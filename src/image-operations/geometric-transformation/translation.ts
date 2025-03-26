import { Coordinates, isMatrix, Tensor } from '../../tensor/tensor';
import { geometricTransform } from './geometricTransform';

export const translate = (image: Tensor, horizontalChange: number, verticalChange: number) => {
  if (!isMatrix(image)) {
    return image;
  }
  const move = ([y, x]: Coordinates) => [y + verticalChange, x + horizontalChange];
  return geometricTransform(image, move);
};
