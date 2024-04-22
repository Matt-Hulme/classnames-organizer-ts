import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { JSXAttribute } from '@babel/types';
import { sortClassNames } from './sortClassNames';

export const parseClassNames = (jsxCode: string): string => {
  const ast = parser.parse(jsxCode, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  let classNamesString = '';

  traverse(ast, {
    JSXOpeningElement(path) {
      const classAttribute = path.node.attributes.find(
        (attribute): attribute is JSXAttribute => attribute.type === 'JSXAttribute' && attribute.name.name === 'class'
      );

      if (classAttribute && classAttribute.value && classAttribute.value.type === 'StringLiteral') {
        classNamesString += ' ' + classAttribute.value.value;
      }
    },
  });

  return sortClassNames(classNamesString.trim());
};