import { describe, expect, test } from 'vitest';
import { parseClassNames } from '../parseClassNames';
import React from 'react';

describe('parseClassNames', () => {
  test('should correctly sort complex mix of class names in a JSX element', () => {
    const jsxElement = (
      <div className="justify-center items-center h-screen bg-blue-500 flex md:justify-start lg:items-end hover:bg-red-500 active:bg-green-500" />
    );
    const output = parseClassNames(jsxElement);
    expect(output).toBe(
      '<div className="bg-blue-500 flex h-screen items-center justify-center md:justify-start lg:items-end active:bg-green-500 hover:bg-red-500" />;'
    );
  });

  test('should correctly sort a mix of standard, responsive, and pseudo class names', () => {
    const jsxElement = (
      <div className="md:justify-start lg:items-end hover:bg-red-500 active:bg-green-500 justify-center items-center h-screen bg-blue-500 flex" />
    );
    const output = parseClassNames(jsxElement);
    expect(output).toBe(
      '<div className="bg-blue-500 flex h-screen items-center justify-center md:justify-start lg:items-end active:bg-green-500 hover:bg-red-500" />;'
    );
  });
  
  test('should correctly sort a mix of standard, responsive, and pseudo class names with different orders', () => {
    const jsxElement = (
      <div className="flex h-screen items-center justify-center md:justify-start lg:items-end active:bg-green-500 hover:bg-red-500 bg-blue-500" />
    );
    const output = parseClassNames(jsxElement);
    expect(output).toBe(
      '<div className="bg-blue-500 flex h-screen items-center justify-center md:justify-start lg:items-end active:bg-green-500 hover:bg-red-500" />;'
    );
  });
  
  test('should correctly sort a mix of standard, responsive, and pseudo class names with duplicates', () => {
    const jsxElement = (
      <div className="flex h-screen items-center justify-center md:justify-start lg:items-end active:bg-green-500 hover:bg-red-500 bg-blue-500 flex" />
    );
    const output = parseClassNames(jsxElement);
    expect(output).toBe(
      '<div className="bg-blue-500 flex flex h-screen items-center justify-center md:justify-start lg:items-end active:bg-green-500 hover:bg-red-500" />;'
    );
  });

});