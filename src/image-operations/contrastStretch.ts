import { Tensor } from '../tensor/tensor';
import { max, min } from '../tensor/recursive-operations';
import { pointwise } from '../tensor/pointwise-operations';

export const contrastStretch = (image: Tensor, globalMax: number, defaultMax = 255, defaultMin = 0) => {
  const maxVal: number = max(image) ?? defaultMax;
  const minVal: number = min(image) ?? defaultMin;
  // ensures that divider is not zero
  const divider = maxVal - minVal || 1;
  const pointwiseOperation = (pixel: number) => ((pixel - minVal) / divider) * globalMax;
  return pointwise(image, pointwiseOperation);
};
