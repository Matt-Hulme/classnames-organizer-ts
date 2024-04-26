import { describe, expect, test } from 'vitest';
import { sortClassNames } from '../sortClassNames';

describe('sortClassNames', () => {
  test('should correctly sort standard class names', () => {
    const input = 'justify-center items-center h-screen bg-blue-500 flex';
    const output = sortClassNames(input);
    expect(output).toBe('bg-blue-500 flex h-screen items-center justify-center');
  });

  test('should correctly sort responsive class names', () => {
    const input = 'md:b lg:a';
    const output = sortClassNames(input);
    expect(output).toBe('md:b lg:a');
  });

  test('should correctly sort pseudo class names', () => {
    const input = 'hover:b active:a';
    const output = sortClassNames(input);
    expect(output).toBe('active:a hover:b');
  });
});