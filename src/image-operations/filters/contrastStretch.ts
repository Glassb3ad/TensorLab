import { Tensor } from '@tensor/types';
import { pointwiseRaw } from '@tensor/operations/pointwise';
import { max } from '@tensor/properties/max';
import { min } from '@tensor/properties/min';
import { tensorGuard } from '@tensor/tensorGuard';

const contrastStretchRaw = (image: Tensor, globalMax = 255) => {
  const maxVal: number = max(image);
  const minVal: number = min(image);
  // ensures that divider is not zero
  const divider = maxVal - minVal || 1;
  const func = (pixel: number) => ((pixel - minVal) / divider) * globalMax;
  return pointwiseRaw(image, func);
};

export const contrastStretch = tensorGuard(contrastStretchRaw);
