import { add } from './add';
import { dotProduct } from './dotProduct';
import { isScalar, isVector } from '../predicates/shapePredicates';
import { Tensor } from '../types';

export function sliceTensorByKernel(t1: Tensor, kernel: Tensor): Array<Tensor> {
  if (isScalar(t1) || isScalar(kernel)) {
    throw new Error('Scalar cannot be sliced');
  }
  const sliceLength = kernel.length;
  const sliceCount = t1.length - sliceLength + 1;
  return [...Array(sliceCount).keys()].map(i => t1.slice(i, sliceLength + i));
}

export function vectorConvolution(tensor: Tensor, kernel: Tensor): Tensor {
  const slices = sliceTensorByKernel(tensor, kernel);
  return slices.map(slice => dotProduct(slice, kernel));
}

export function convolution(tensor: Tensor, kernel: Tensor): Tensor {
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
      tempConvolutions.push(convolution((slice as Array<Tensor>)[i], subKernel));
    }
    convolutedTensors.push(tempConvolutions.reduce((pre, cur) => add(pre, cur)));
  }
  return convolutedTensors;
}
