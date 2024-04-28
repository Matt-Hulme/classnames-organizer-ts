import { describe, expect, test } from 'vitest';
import { parseClassNames } from '../parseClassNames';
import React from 'react';

describe('parseClassNames', () => {
  test.skip('should correctly sort complex mix of class names in a JSX element', () => {
    const className = "justify-center items-center h-screen bg-blue-500 flex md:justify-start lg:items-end hover:bg-red-500 active:bg-green-500";
    const output = parseClassNames(className);
    expect(output).toBe(
      'active:bg-green-500 bg-blue-500 flex h-screen hover:bg-red-500 items-center justify-center lg:items-end md:justify-start'
    );
  });

  test.skip('should correctly sort a mix of standard, responsive, and pseudo class names', () => {
    const className = "md:justify-start lg:items-end hover:bg-red-500 active:bg-green-500 justify-center items-center h-screen bg-blue-500 flex";
    const output = parseClassNames(className);
    expect(output).toBe(
      'active:bg-green-500 bg-blue-500 flex h-screen hover:bg-red-500 items-center justify-center lg:items-end md:justify-start'
    );
  });
  
  test.skip('should correctly sort a mix of standard, responsive, and pseudo class names with different orders', () => {
    const className = "flex h-screen items-center justify-center md:justify-start lg:items-end active:bg-green-500 hover:bg-red-500 bg-blue-500";
    const output = parseClassNames(className);
    expect(output).toBe(
      'active:bg-green-500 bg-blue-500 flex h-screen hover:bg-red-500 items-center justify-center lg:items-end md:justify-start'
    );
  });
  
  test.skip('should correctly sort a mix of standard, responsive, and pseudo class names with duplicates', () => {
    const className = "flex h-screen items-center justify-center md:justify-start lg:items-end active:bg-green-500 hover:bg-red-500 bg-blue-500 flex";
    const output = parseClassNames(className);
    expect(output).toBe(
      'active:bg-green-500 bg-blue-500 flex flex h-screen hover:bg-red-500 items-center justify-center lg:items-end md:justify-start'
    );
  });
});