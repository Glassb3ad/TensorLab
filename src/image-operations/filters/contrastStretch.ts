import { Tensor } from '@tensor/types';
import { pointwise } from '@tensor/operations/pointwise';
import { max } from '@tensor/properties/max';
import { min } from '@tensor/properties/min';
import { tensorGuard } from '@tensor/tensorGuard';

const contrastStretchRaw = (image: Tensor, globalMax: number, defaultMax = 255, defaultMin = 0) => {
  const maxVal: number = max(image) ?? defaultMax;
  const minVal: number = min(image) ?? defaultMin;
  // ensures that divider is not zero
  const divider = maxVal - minVal || 1;
  const pointwiseOperation = (pixel: number) => ((pixel - minVal) / divider) * globalMax;
  return pointwise(image, pointwiseOperation);
};

export const contrastStretch = tensorGuard(contrastStretchRaw);
