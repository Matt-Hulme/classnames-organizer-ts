import { parse } from '@typescript-eslint/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import { sortClassNames } from './sortClassNames';
import prettier from 'prettier';

export const parseClassNames = async (jsxCode: string): Promise<string> => {
  const ast = parse(jsxCode, { jsx: true, useJSXTextNode: true });

  traverse(ast, {
    JSXAttribute(path) {
      if (path.node.name.name !== 'className') {
        return;
      }

      if (path.node.value && path.node.value.type === 'StringLiteral') {
        const classNames = path.node.value.value;
        const sortedClassNames = sortClassNames(classNames);
        path.node.value.value = sortedClassNames;
      }

      if (path.node.value && path.node.value.type === 'JSXExpressionContainer') {
        const { expression } = path.node.value;

        if (expression.type === 'ConditionalExpression') {
          // Handle ternary expressions
          if (expression.consequent.type === 'StringLiteral') {
            const classNames = expression.consequent.value;
            const sortedClassNames = sortClassNames(classNames);
            expression.consequent.value = sortedClassNames;
          }

          if (expression.alternate.type === 'StringLiteral') {
            const classNames = expression.alternate.value;
            const sortedClassNames = sortClassNames(classNames);
            expression.alternate.value = sortedClassNames;
          }
        }

        if (expression.type === 'CallExpression' && expression.callee.type === 'Identifier' && expression.callee.name === 'classnames') {
          // Handle 'classnames' package
          expression.arguments.forEach(arg => {
            if (arg.type === 'StringLiteral') {
              const classNames = arg.value;
              const sortedClassNames = sortClassNames(classNames);
              arg.value = sortedClassNames;
            }
          });
        }
      }
    },
  });

  const { code } = generate(ast);
  const formattedCode = prettier.format(code, { semi: false, parser: 'babel' });
  return formattedCode;
};