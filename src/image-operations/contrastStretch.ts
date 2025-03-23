import { Tensor } from '../tensor';
import { max, min } from '../recursive-operations';
import { pointwise } from '../pointwise-operations';

export const contrastStretch = (image: Tensor, globalMax: number, defaultMax = 255, defaultMin = 0) => {
  const maxVal: number = max(image) ?? defaultMax;
  const minVal: number = min(image) ?? defaultMin;
  // ensures that divider is not zero
  const divider = maxVal - minVal || 1;
  const pointwiseOperation = (pixel: number) => ((pixel - minVal) / divider) * globalMax;
  return pointwise(image, pointwiseOperation);
};
