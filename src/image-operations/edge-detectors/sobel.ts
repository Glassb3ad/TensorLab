import { convolution, isMatrix, Tensor } from '@/tensor';
import { combine } from '@/tensor/operations/combine';
import { tensorGuard } from '@/tensor/tensorGuard';

const kernelX = [
  [1, 0, -1],
  [2, 0, -2],
  [1, 0, -1],
];

const kernelY = [
  [1, 2, 1],
  [0, 0, 0],
  [-1, -2, -1],
];

const magnitude = (x: number, y: number) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

const sobelRaw = (image: Tensor) => {
  if (!isMatrix(image)) {
    throw Error('Image is not grayscale');
  }

  const gradientsX = convolution(image, kernelX);
  const gradientsY = convolution(image, kernelY);
  const result = combine(gradientsX, gradientsY, magnitude);
  return result;
};

export const sobel = tensorGuard(sobelRaw);
