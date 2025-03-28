import { tensorGuard } from '@tensor/tensorGuard';
import { convolution } from '@tensor/operations/convolution';
import { is3D } from '@tensor/predicates/shapePredicates';
import { Tensor } from '@tensor/types';

const RGB_2_GRAY_KERNEL = [[[0.2989]], [[0.587]], [[0.114]]];

export const rgb2grayRaw = (image: Tensor) => {
  if (!is3D(image)) {
    throw Error('Tensor is not 3 dimensional');
  }
  const convolutedTensor = convolution(image, RGB_2_GRAY_KERNEL) as Array<Array<Tensor>>;
  return convolutedTensor[0];
};

export const rgb2gray = tensorGuard(rgb2grayRaw);
