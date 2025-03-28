import { Tensor } from '@tensor/types';
import { pointwiseRaw } from '@tensor/operations/pointwise';
import { max } from '@tensor/properties/max';
import { min } from '@tensor/properties/min';
import { tensorGuard } from '@tensor/tensorGuard';

const contrastStretchRaw = (image: Tensor, globalMax: number) => {
  const maxVal: number = max(image);
  const minVal: number = min(image);
  // ensures that divider is not zero
  const divider = maxVal - minVal || 1;
  const pointwiseOperation = (pixel: number) => ((pixel - minVal) / divider) * globalMax;
  return pointwiseRaw(image, pointwiseOperation);
};

export const contrastStretch = tensorGuard(contrastStretchRaw);
