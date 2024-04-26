import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { JSXAttribute, JSXExpressionContainer, StringLiteral } from '@babel/types';
import { sortClassNames } from './sortClassNames';
import generate from '@babel/generator';
import { ReactElement } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';

export const parseClassNames = (jsxElement: ReactElement): string => {
  const jsxCode = reactElementToJSXString(jsxElement);
  const ast = parser.parse(jsxCode, { sourceType: 'module', plugins: ['jsx'] });

  traverse(ast, {
    JSXOpeningElement(path) {
      const classAttribute = path.node.attributes.find(
        (attribute): attribute is JSXAttribute => attribute.type === 'JSXAttribute' && attribute.name.name === 'className'
      );

      if (classAttribute && classAttribute.value) {
        let classNames: string | null = null;
        let valueNode: StringLiteral | null = null;

        if (classAttribute.value.type === 'StringLiteral') {
          classNames = classAttribute.value.value;
          valueNode = classAttribute.value;
        } else if (classAttribute.value.type === 'JSXExpressionContainer' && classAttribute.value.expression.type === 'StringLiteral') {
          classNames = (classAttribute.value.expression as StringLiteral).value;
          valueNode = classAttribute.value.expression as StringLiteral;
        }

        if (classNames && valueNode) {
          const sortedClassNames = sortClassNames(classNames);
          valueNode.value = sortedClassNames;
        }
      }
    },
  });

  const { code } = generate(ast);
  return code;
};