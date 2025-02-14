type TensorArg = Array<TensorArg> | number;

export type Tensor = Array<Tensor> | number;

export const createTensorFromArray = (tensor: TensorArg): Tensor => {
  //TODO check that arrays have the same length
  return tensor;
};

export const isScalar = (t: Tensor) => typeof t === 'number';

export const isVector = (t: Tensor) => !isScalar(t) && isScalar(t[0]);

export const equalShape = (t1: Tensor, t2: Tensor): boolean => {
  if (isScalar(t1) && isScalar(t2)) {
    return true;
  }
  if (isScalar(t1) || isScalar(t2)) {
    return false;
  }
  if (t1.length !== t2.length) {
    return false;
  }
  return equalShape(t1[0], t2[0]);
};

export const elementWise = (tensor: Tensor, operation: (arg: number) => number): Tensor => {
  if (Array.isArray(tensor)) {
    return tensor.map(t => elementWise(t, operation));
  }
  return operation(tensor);
};

export const add = (t1: Tensor, t2: Tensor): Tensor => {
  if (!equalShape(t1, t2)) {
    throw new Error('tensors have unequal dimensions');
  }
  if (Array.isArray(t1) && Array.isArray(t2)) {
    return t1.map((tensor, index) => add(tensor, t2[index]));
  }
  return (t1 as number) + (t2 as number);
};

const dotProductRec = (t1: Tensor, t2: Tensor): Tensor => {
  if (Array.isArray(t1) && Array.isArray(t2)) {
    const sum = t1.reduce((pre, cur, index) => (dotProductRec(cur, t2[index]) as number) + (pre as number), 0);
    return sum;
  }
  return (t1 as number) * (t2 as number);
};

export const dotProduct = (t1: Tensor, t2: Tensor): Tensor => {
  if (!equalShape(t1, t2)) {
    throw new Error('tensors must have same dimensions');
  }
  return dotProductRec(t1, t2);
};

export const sliceTensorByKernel = (t1: Tensor, kernel: Tensor): Array<Tensor> => {
  if (isScalar(t1) || isScalar(kernel)) {
    throw new Error('Scalar cannot be sliced');
  }
  const sliceLength = kernel.length;
  const sliceCount = t1.length - sliceLength + 1;
  return [...Array(sliceCount).keys()].map(i => t1.slice(i, sliceLength + i));
};

const vectorConvolution = (tensor: Tensor, kernel: Tensor): Tensor => {
  const slices = sliceTensorByKernel(tensor, kernel);
  return slices.map(slice => dotProduct(slice, kernel));
};

export const convolution = (tensor: Tensor, kernel: Tensor): Tensor => {
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
};
