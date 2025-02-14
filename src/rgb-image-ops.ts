import { convolution } from './convolution';
import { is3D, Tensor } from './tensor';

const RGB_2_GRAY_KERNEL = [[[0.2989]], [[0.587]], [[0.114]]];

export function rgb2gray(tensor: Tensor) {
  if (!is3D(tensor)) {
    throw Error('Tensor is not 3d');
  }
  const convolutedTensor = convolution(tensor, RGB_2_GRAY_KERNEL) as Array<Tensor>;
  return convolutedTensor[0];
}
