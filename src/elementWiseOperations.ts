export const createTresholdOperation =
  (tresholdVal: number, aboveTreshold = 1, underTreshold = 0) =>
  (scalar: number): number =>
    scalar >= tresholdVal ? aboveTreshold : underTreshold;
