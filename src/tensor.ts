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

  static dotProduct(t1: Tensor, t2: Tensor) {
    if (t1.dimensions[0] !== t2.dimensions[0]) {
      throw new Error('tensors must have same dimensions');
    }
    return t1;
  }

  // static convolution(tensor: Tensor, kernel: Tensor) {
  //   if (typeof tensor.tensor === 'number' && typeof kernel.tensor === 'number') {
  //     return new Tensor(tensor.tensor * kernel.tensor, []);
  //   }
  //   if (tensor.dimensions.length === 1 && kernel.dimensions.length === 1) {
  //     return new Tensor(tensor.tensor * kernel.tensor, []);
  //   }
  // }
}
