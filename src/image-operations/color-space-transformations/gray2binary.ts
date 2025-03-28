import { tensorGuard } from '@tensor/tensorGuard';
import { isMatrix } from '@tensor/predicates/shapePredicates';
import { Tensor } from '@tensor/types';
import { contrastStretch, treshold } from '@image/filters';

export const gray2binaryRaw = (image: Tensor) => {
  if (!isMatrix(image)) {
    throw Error('Image is not grayscale');
  }
  return treshold(contrastStretch(image), Math.round(255 / 2), 255, 0);
};

export const gray2binary = tensorGuard(gray2binaryRaw);
