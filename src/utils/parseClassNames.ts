import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { JSXAttribute } from '@babel/types';
import { sortClassNames } from './sortClassNames';
import generate from '@babel/generator';

export const parseClassNames = (jsxCode: string): string => {
  const ast = parser.parse(jsxCode, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  traverse(ast, {
    JSXOpeningElement(path) {
      const classAttribute = path.node.attributes.find(
        (attribute): attribute is JSXAttribute => attribute.type === 'JSXAttribute' && attribute.name.name === 'className'
      );

      if (classAttribute && classAttribute.value && classAttribute.value.type === 'StringLiteral') {
        // Sort the class names and replace the original class names with the sorted ones
        classAttribute.value.value = sortClassNames(classAttribute.value.value);
      }
    },
  });

  // Generate the JSX code from the modified AST
  const { code } = generate(ast);

  return code;
};