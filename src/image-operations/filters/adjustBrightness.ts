import { pointwise } from '../../tensor/operations/pointwise';
import { Tensor } from '../../tensor/types';

export const adjustBrightness = (tensor: Tensor, magnitude: number, max = 255, min = 0) => {
  const modifyIntensity = (intensity: number) => {
    const newIntensity = intensity * magnitude;
    return Math.max(min, Math.min(newIntensity, max));
  };
  return pointwise(tensor, modifyIntensity);
};
