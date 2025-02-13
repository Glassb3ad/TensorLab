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

  static dotProduct(t1: Tensor, t2: Tensor): Tensor {
    console.log('first', t1.toArray());
    console.log('second', t2.toArray());
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

  static convolution(tensor: Tensor, kernel: Tensor): Tensor {
    console.log({ tensor, kernel });
    if (kernel.dimensions.length === 1 && tensor.dimensions.length === 1) {
      console.log('array1:', tensor.toArray());
      console.log('array2:', kernel.toArray());
      const kernelLength = kernel.dimensions[0];
      const sliceCount = tensor.dimensions[0] - kernelLength + 1;
      console.log({ sliceCount });
      const slices = [...Array(sliceCount).keys()].map(
        i => new Tensor((tensor.tensor as Array<Tensor>).slice(i, kernelLength + i), [kernelLength]),
      );
      return new Tensor(
        slices.map(slice => Tensor.dotProduct(slice, kernel)),
        [sliceCount],
      );
    }
    const kernelLength = kernel.dimensions[0];
    const [firstDim, ...dimensions] = tensor.dimensions;
    // console.log({ firstDim, dimensions });
    const sliceCount = firstDim - kernelLength + 1;
    const slices = [...Array(sliceCount).keys()].map(
      i => new Tensor((tensor.tensor as Array<Tensor>).slice(i, kernelLength + i), [...dimensions]),
    );
    // console.log({ sliceCount, kernelLength });
    console.log('slices', slices);
    console.log('firstSlices', slices[0]);

    // console.log({ kernelDim: kernel.dimensions, tensor: kernel.tensor, tensorArr: kernel.tensor?.[0] });
    const subTensors = slices.map((slice, i) =>
      (slice.tensor as Array<Tensor>).map(t => Tensor.convolution(t, (kernel.tensor as Array<Tensor>)[0])),
    );
    console.log({ subTensors: subTensors.flat(2) });
    // return tensor;
    return new Tensor(subTensors.flat(2), [sliceCount, ...subTensors.flat(2)[0].dimensions]);
  }
}
