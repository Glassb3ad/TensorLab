type TensorArg = Array<TensorArg> | number;

export class Tensor {
  tensor: Array<Tensor> | number;
  dimensions?: Array<number>;

  constructor(value: TensorArg, dimensions: Array<number>) {
    if (Array.isArray(value)) {
      if (dimensions[0] !== value.length) {
        throw new Error('initial value violates given dimension');
      }
      this.dimensions = dimensions;
      this.tensor = value.map(a => new Tensor(a, dimensions.slice(1)));
    } else {
      if (dimensions && dimensions.length !== 0) {
        throw new Error('initial value violates given dimension');
      }
      this.tensor = value;
    }
  }

  toArray(): TensorArg {
    if (Array.isArray(this.tensor)) {
      return this.tensor.map(a => a.toArray());
    } else {
      return this.tensor;
    }
  }
}
