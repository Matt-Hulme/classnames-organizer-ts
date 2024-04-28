import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { JSXAttribute, StringLiteral } from '@babel/types';
import { sortClassNames } from './sortClassNames';
import generate from '@babel/generator';

export const parseClassNames = (jsxCode: string): string => {
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
          valueNode = classAttribute.value;jj 
        } else if (classAttribute.value.type === 'JSXExpressionContainer') {
          if (classAttribute.value.expression.type === 'StringLiteral') {
            classNames = (classAttribute.value.expression as StringLiteral).value;
            valueNode = classAttribute.value.expression as StringLiteral;
          } else if (classAttribute.value.expression.type === 'ConditionalExpression') {
            const conditionalExpression = classAttribute.value.expression;
            if (conditionalExpression.consequent.type === 'StringLiteral') {
              const classNames = conditionalExpression.consequent.value;
              const sortedClassNames = sortClassNames(classNames);
              conditionalExpression.consequent.value = sortedClassNames;
            }
            if (conditionalExpression.alternate.type === 'StringLiteral') {
              const classNames = conditionalExpression.alternate.value;
              const sortedClassNames = sortClassNames(classNames);
              conditionalExpression.alternate.value = sortedClassNames;
            }
          }
        }

        if (classNames && valueNode) {
          const sortedClassNames = sortClassNames(classNames);
          valueNode.value = sortedClassNames;
        }
      }
    },
    CallExpression(path) {
      if (
        path.node.callee.type === 'Identifier' &&
        path.node.callee.name === 'classNames' &&
        path.node.arguments.length > 0 &&
        path.node.arguments[0].type === 'ObjectExpression'
      ) {
        path.node.arguments[0].properties.forEach((property) => {
          if (property.type === 'ObjectProperty' && property.key.type === 'StringLiteral') {
            const classNames = property.key.value;
            const sortedClassNames = sortClassNames(classNames);
            property.key.value = sortedClassNames;
          }
        });
      }
    },
  });
  

  const { code } = generate(ast);
  return code;
};