import { validateTensor } from '@/tensor/validateTensor';
import { describe, test, expect, vi, beforeEach } from 'vitest';

const mockFunc = vi.fn((tensor, str: string) => str);

describe('validateTensor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('calls wrapped function with a valid scalar', () => {
    const wrappedFunc = validateTensor(mockFunc);

    const result = wrappedFunc(2, 'hello scalar!');
    expect(mockFunc).toBeCalled();
    expect(result).toBe('hello scalar!');
  });

  test('calls wrapped function with a valid vector', () => {
    const wrappedFunc = validateTensor(mockFunc);

    const result = wrappedFunc([2, 2, 3, 4], 'hello vector!');
    expect(mockFunc).toBeCalled();
    expect(result).toBe('hello vector!');
  });

  test('Throw error when the first argument is string', () => {
    const wrappedFunc = validateTensor(mockFunc);

    expect(() => wrappedFunc('hello you!', 'Hello vector!')).toThrowError(TypeError);
    expect(mockFunc).not.toBeCalled();
  });

  test('Throw error when the first argument is invalid matrix', () => {
    const wrappedFunc = validateTensor(mockFunc);

    expect(() => wrappedFunc([[1, 2], [2]], 'Hello vector!')).toThrowError(TypeError);
    expect(mockFunc).not.toBeCalled();
  });
});
