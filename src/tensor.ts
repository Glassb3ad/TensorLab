type TensorArg = Array<TensorArg> | number;

export class Tensor {
  tensor: Array<Tensor> | number;
  dimensions: Array<number>;

  private constructor(tensor: Array<Tensor> | number, dimensions: Array<number>) {
    this.tensor = tensor;
    this.dimensions = dimensions;
  }

  static createTensorFromArray = (tensor: TensorArg, dimensions: Array<number>): Tensor => {
    if (Array.isArray(tensor)) {
      if (dimensions[0] !== tensor.length) {
        throw new Error('initial value violates given dimension');
      }
      const newTensor = tensor.map(a => Tensor.createTensorFromArray(a, dimensions.slice(1)));
      return new Tensor(newTensor, dimensions);
    } else {
      if (dimensions.length !== 0) {
        throw new Error('initial value violates given dimension');
      }
      return new Tensor(tensor, dimensions);
    }
  };

  static createTensorFromTensor = (tensor: Tensor, dimensions: Array<number>): Tensor => {
    if (Array.isArray(tensor.tensor)) {
      if (dimensions[0] !== tensor.tensor.length) {
        throw new Error('initial value violates given dimension');
      }
      const newTensor = tensor.tensor.map(a => Tensor.createTensorFromTensor(a, dimensions.slice(1)));
      return new Tensor(newTensor, dimensions);
    } else {
      if (dimensions.length !== 0) {
        throw new Error('initial value violates given dimension');
      }
      return new Tensor(tensor.tensor, dimensions);
    }
  };

  toArray(): TensorArg {
    if (Array.isArray(this.tensor)) {
      return this.tensor.map(a => a.toArray());
    } else {
      return this.tensor;
    }
  }

  static elementWise(tensor: Tensor, operation: (arg: number) => number): Tensor {
    if (Array.isArray(tensor.tensor)) {
      return new Tensor(
        tensor.tensor.map(t => Tensor.elementWise(t, operation)),
        tensor.dimensions,
      );
    }
    return new Tensor(operation(tensor.tensor), []);
  }

  static isVector(t: Tensor): boolean {
    return true;
  }

  static add(t1: Tensor, t2: Tensor): Tensor {
    if (t1.dimensions[0] !== t2.dimensions[0]) {
      throw new Error('tensors have unequal dimensions');
    }
    if (Array.isArray(t1.tensor) && Array.isArray(t2.tensor)) {
      const tensorArray = t2.tensor;
      const tensors = t1.tensor.map((tensor, index) => Tensor.add(tensor, tensorArray[index]));
      return new Tensor(tensors, t1.dimensions);
    }
    return new Tensor((t1.tensor as number) + (t2.tensor as number), []);
  }

  static dotProduct(t1: Tensor, t2: Tensor): Tensor {
    if (t1.dimensions[0] !== t2.dimensions[0]) {
      throw new Error('tensors must have same dimensions');
    }
    if (Array.isArray(t1.tensor) && Array.isArray(t2.tensor)) {
      const tensorArray = t2.tensor;
      const sum = t1.tensor.reduce(
        (pre, cur, index) => (Tensor.dotProduct(cur, tensorArray[index]).tensor as number) + pre,
        0,
      );
      return new Tensor(sum, []);
    }
    return new Tensor((t1.tensor as number) * (t2.tensor as number), []);
  }

  static sliceTensorByKernel = (t1: Tensor, kernel: Tensor): Array<Tensor> => {
    if (typeof t1.tensor === 'number' || typeof kernel.tensor === 'number') {
      throw new Error('Scalar cannot be sliced');
    }
    const kernelLength = kernel.tensor.length;
    const subTensors = t1.tensor;
    const sliceCount = subTensors.length - kernelLength + 1;
    return [...Array(sliceCount).keys()].map(
      i => new Tensor(subTensors.slice(i, kernelLength + i), [kernelLength, ...t1.dimensions.slice(1)]),
    );
  };

  static vectorConvolution(tensor: Tensor, kernel: Tensor): Tensor {
    const slices = Tensor.sliceTensorByKernel(tensor, kernel);
    return new Tensor(
      slices.map(slice => Tensor.dotProduct(slice, kernel)),
      [slices.length],
    );
  }

  static convolution(tensor: Tensor, kernel: Tensor): Tensor {
    if (typeof tensor.tensor === 'number' || typeof kernel.tensor === 'number') {
      throw new Error('Convolution does not support scalars');
    }

    if (kernel.dimensions.length === 1 && tensor.dimensions.length === 1) {
      return this.vectorConvolution(tensor, kernel);
    }

    const slices = Tensor.sliceTensorByKernel(tensor, kernel);
    const convolutedTensors = [];
    for (const slice of slices) {
      const tempConvolutions = [];
      for (let i = 0; i < kernel.tensor.length; i++) {
        const subKernel = kernel.tensor[i];
        tempConvolutions.push(Tensor.convolution((slice.tensor as Array<Tensor>)[i], subKernel));
      }
      convolutedTensors.push(tempConvolutions.reduce((pre, cur) => Tensor.add(pre, cur)));
    }
    return new Tensor(convolutedTensors, [
      convolutedTensors.length,
      ...(convolutedTensors[0] ? convolutedTensors[0].dimensions : []),
    ]);
  }
}
