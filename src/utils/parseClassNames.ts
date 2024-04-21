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
      const classNameAttribute = path.node.attributes.find(
        (attribute): attribute is JSXAttribute => attribute.type === 'JSXAttribute' && attribute.name.name === 'className'
      );

      if (classNameAttribute && classNameAttribute.value && classNameAttribute.value.type === 'StringLiteral') {
        classNamesString += ' ' + classNameAttribute.value.value;
      }
    },
  });

  return sortClassNames(classNamesString.trim());
};