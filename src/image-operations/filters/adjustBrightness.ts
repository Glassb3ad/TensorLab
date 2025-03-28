import { tensorGuard } from '@tensor/tensorGuard';
import { pointwiseRaw } from '@tensor/operations/pointwise';
import { Tensor } from '@tensor/types';

export const adjustBrightnessRaw = (image: Tensor, magnitude: number, max = 255, min = 0) => {
  const transformPixel = (intensity: number) => {
    const newIntensity = intensity * magnitude;
    return Math.max(min, Math.min(newIntensity, max));
  };
  return pointwiseRaw(image, transformPixel);
};

export const adjustBrightness = tensorGuard(adjustBrightnessRaw);
