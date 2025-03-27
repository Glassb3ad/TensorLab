import { tensorGuard } from '../tensorGuard';
import { add } from './add';
import { dotProduct } from './dotProduct';
import { isScalar, isVector } from '@tensor/predicates/shapePredicates';
import { Tensor } from '@tensor/types';

export const sliceTensorByKernel = (t1: Tensor, kernel: Tensor): Array<Tensor> => {
  if (isScalar(t1) || isScalar(kernel)) {
    throw new Error('Scalar cannot be sliced');
  }
  const sliceLength = kernel.length;
  const sliceCount = t1.length - sliceLength + 1;
  return [...Array(sliceCount).keys()].map(i => t1.slice(i, sliceLength + i));
};

export const vectorConvolution = (tensor: Tensor, kernel: Tensor): Tensor => {
  const slices = sliceTensorByKernel(tensor, kernel);
  return slices.map(slice => dotProduct(slice, kernel));
};

const convolutionRaw = (tensor: Tensor, kernel: Tensor): Tensor => {
  if (isScalar(tensor) || isScalar(kernel)) {
    throw new Error('Convolution does not support scalars');
  }

  if (isVector(tensor) && isVector(kernel)) {
    return vectorConvolution(tensor, kernel);
  }

  const slices = sliceTensorByKernel(tensor, kernel);
  const convolutedTensors = [];
  for (const slice of slices) {
    const tempConvolutions = [];
    for (let i = 0; i < kernel.length; i++) {
      const subKernel = kernel[i];
      tempConvolutions.push(convolutionRaw((slice as Array<Tensor>)[i], subKernel));
    }
    convolutedTensors.push(tempConvolutions.reduce((pre, cur) => add(pre, cur)));
  }
  return convolutedTensors;
};

export const convolution = tensorGuard(convolutionRaw);
