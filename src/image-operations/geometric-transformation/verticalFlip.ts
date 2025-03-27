import { Coordinates, Tensor } from '@tensor/types';
import { geometricTransform } from './geometricTransform';
import { tensorGuard } from '@tensor/tensorGuard';

export const verticalFlipRaw = (image: Array<Tensor>) => {
  const matrixHeight = image.length;
  const move = ([y, x]: Coordinates) => [matrixHeight - y - 1, x];
  return geometricTransform(image, move);
};

export const verticalFlip = tensorGuard(verticalFlipRaw);
