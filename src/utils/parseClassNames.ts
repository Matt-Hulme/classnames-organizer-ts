import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { JSXAttribute, JSXExpressionContainer, StringLiteral } from '@babel/types';
import { sortClassNames } from './sortClassNames';
import generate from '@babel/generator';
import { ReactElement } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

export const parseClassNames = (jsxElement: ReactElement): string => {
  // Convert the ReactElement to a string of JSX code
  const jsxCode = reactElementToJSXString(jsxElement);

  const ast = parser.parse(jsxCode, {
    sourceType: 'module',
    plugins: ['jsx'],
  });

  traverse(ast, {
    JSXOpeningElement(path) {
      const classAttribute = path.node.attributes.find(
        (attribute): attribute is JSXAttribute => attribute.type === 'JSXAttribute' && attribute.name.name === 'className'
      );

      if (classAttribute && classAttribute.value) {
        let classNames: string | null = null;

        if (classAttribute.value.type === 'StringLiteral') {
          classNames = classAttribute.value.value;
        } else if (classAttribute.value.type === 'JSXExpressionContainer' && classAttribute.value.expression.type === 'StringLiteral') {
          classNames = (classAttribute.value.expression as StringLiteral).value;
        }

        if (classNames) {
          const sortedClassNames = sortClassNames(classNames);
          if (classAttribute.value.type === 'StringLiteral') {
            classAttribute.value.value = sortedClassNames;
          } else if (classAttribute.value.type === 'JSXExpressionContainer' && classAttribute.value.expression.type === 'StringLiteral') {
            (classAttribute.value.expression as StringLiteral).value = sortedClassNames;
          }
        }
      }
    },
  });

  const { code } = generate(ast);

  return code;
};