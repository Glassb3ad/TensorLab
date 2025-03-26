import { Coordinates, Tensor } from '../../tensor';
import { geometricTransform } from './geometricTransform';

export const verticalFlip = (image: Array<Tensor>) => {
  const matrixHeight = image.length;
  const move = ([y, x]: Coordinates) => [matrixHeight - y - 1, x];
  return geometricTransform(image, move);
};
