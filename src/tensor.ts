type TensorArg = Array<TensorArg> | number;

export class Tensor {
  tensor: Array<Tensor> | number;

  private constructor(tensor: Array<Tensor> | number) {
    this.tensor = tensor;
  }

  static createTensorFromArray = (tensor: TensorArg): Tensor => {
    if (Array.isArray(tensor)) {
      //TODO check that arrays have the same length
      const newTensor = tensor.map(a => Tensor.createTensorFromArray(a));
      return new Tensor(newTensor);
    } else {
      return new Tensor(tensor);
    }
  };

  toArray(): TensorArg {
    if (Array.isArray(this.tensor)) {
      return this.tensor.map(a => a.toArray());
    } else {
      return this.tensor;
    }
  }

  static equalShape(t1: Tensor, t2: Tensor): boolean {
    if (Tensor.isScalar(t1) && Tensor.isScalar(t2)) {
      return true;
    }
    if (Tensor.isScalar(t1) || Tensor.isScalar(t2)) {
      return false;
    }
    if ((t1.tensor as Array<Tensor>).length !== (t2.tensor as Array<Tensor>).length) {
      return false;
    }
    return Tensor.equalShape((t1.tensor as Array<Tensor>)[0], (t2.tensor as Array<Tensor>)[0]);
  }

  static elementWise(tensor: Tensor, operation: (arg: number) => number): Tensor {
    if (Array.isArray(tensor.tensor)) {
      return new Tensor(tensor.tensor.map(t => Tensor.elementWise(t, operation)));
    }
    return new Tensor(operation(tensor.tensor));
  }

  static isVector(t: Tensor): boolean {
    return !Tensor.isScalar(t) && Tensor.isScalar((t.tensor as Array<Tensor>)[0]);
  }

  static isScalar(t: Tensor): boolean {
    return typeof t.tensor === 'number';
  }

  static add(t1: Tensor, t2: Tensor): Tensor {
    if (!Tensor.equalShape(t1, t2)) {
      throw new Error('tensors have unequal dimensions');
    }
    if (Array.isArray(t1.tensor) && Array.isArray(t2.tensor)) {
      const tensorArray = t2.tensor;
      const tensors = t1.tensor.map((tensor, index) => Tensor.add(tensor, tensorArray[index]));
      return new Tensor(tensors);
    }
    return new Tensor((t1.tensor as number) + (t2.tensor as number));
  }

  private static dotProductRec(t1: Tensor, t2: Tensor): Tensor {
    if (Array.isArray(t1.tensor) && Array.isArray(t2.tensor)) {
      const tensorArray = t2.tensor;
      const sum = t1.tensor.reduce(
        (pre, cur, index) => (Tensor.dotProduct(cur, tensorArray[index]).tensor as number) + pre,
        0,
      );
      return new Tensor(sum);
    }
    return new Tensor((t1.tensor as number) * (t2.tensor as number));
  }

  static dotProduct(t1: Tensor, t2: Tensor): Tensor {
    if (!Tensor.equalShape(t1, t2)) {
      throw new Error('tensors must have same dimensions');
    }
    return Tensor.dotProductRec(t1, t2);
  }

  static sliceTensorByKernel = (t1: Tensor, kernel: Tensor): Array<Tensor> => {
    if (Tensor.isScalar(t1) || Tensor.isScalar(kernel)) {
      throw new Error('Scalar cannot be sliced');
    }
    const kernelLength = (kernel.tensor as Array<Tensor>).length;
    const sliceCount = (t1.tensor as Array<Tensor>).length - kernelLength + 1;
    return [...Array(sliceCount).keys()].map(i => new Tensor((t1.tensor as Array<Tensor>).slice(i, kernelLength + i)));
  };

  static vectorConvolution(tensor: Tensor, kernel: Tensor): Tensor {
    const slices = Tensor.sliceTensorByKernel(tensor, kernel);
    return new Tensor(slices.map(slice => Tensor.dotProduct(slice, kernel)));
  }

  static convolution(tensor: Tensor, kernel: Tensor): Tensor {
    if (Tensor.isScalar(tensor) || Tensor.isScalar(kernel)) {
      throw new Error('Convolution does not support scalars');
    }

    if (Tensor.isVector(tensor) && Tensor.isVector(kernel)) {
      return this.vectorConvolution(tensor, kernel);
    }

    const slices = Tensor.sliceTensorByKernel(tensor, kernel);
    const convolutedTensors = [];
    for (const slice of slices) {
      const tempConvolutions = [];
      for (let i = 0; i < (kernel.tensor as Array<Tensor>).length; i++) {
        const subKernel = (kernel.tensor as Array<Tensor>)[i];
        tempConvolutions.push(Tensor.convolution((slice.tensor as Array<Tensor>)[i], subKernel));
      }
      convolutedTensors.push(tempConvolutions.reduce((pre, cur) => Tensor.add(pre, cur)));
    }
    return new Tensor(convolutedTensors);
  }
}
