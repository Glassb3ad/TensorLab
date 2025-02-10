type TensorArg = Array<TensorArg> | number;

export class Tensor {
  tensor: Array<Tensor> | number;

  constructor(value: TensorArg) {
    if (Array.isArray(value)) {
      this.tensor = value.map(a => new Tensor(a));
    } else {
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
