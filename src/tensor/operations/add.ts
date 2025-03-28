import { Tensor } from '@tensor/types';
import { tensorGuard } from '../tensorGuard';
import { combineRaw } from './combine';
import { Scalar } from '../../../dist';

const addRaw = (t1: Tensor, t2: Tensor): Tensor => combineRaw(t1, t2, (x: Scalar, y: Scalar) => x + y);

export const add = tensorGuard(addRaw, 2);
