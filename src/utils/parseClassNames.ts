import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import { sortClassNames } from './sortClassNames';
import { Identifier } from '@babel/types';

export const parseClassNames = (tsxCode: string): string => {
  const ast = parser.parse(tsxCode, { sourceType: 'module', plugins: ['jsx', 'typescript', 'importMeta', 'dynamicImport'] });

  traverse(ast, {
    JSXAttribute(path) {
      if (path.node.name.name !== 'className') {
        return;
      }

      if (path.node.value && path.node.value.type === 'StringLiteral') {
        const classNames = path.node.value.value;
        const sortedClassNames = sortClassNames(classNames);
        path.node.value.value = sortedClassNames;
      } else if (path.node.value && path.node.value.type === 'JSXExpressionContainer') {
        const { expression } = path.node.value;
        if (expression.type === 'StringLiteral') {
          const classNames = expression.value;
          const sortedClassNames = sortClassNames(classNames);
          expression.value = sortedClassNames;
        } else if (expression.type === 'CallExpression' && (expression.callee as Identifier).name === 'classNames') {
          expression.arguments.forEach(arg => {
            if (arg.type === 'StringLiteral') {
              const classNames = arg.value;
              const sortedClassNames = sortClassNames(classNames);
              arg.value = sortedClassNames;
            }
          });
        } else if (expression.type === 'TemplateLiteral') {
          expression.quasis.forEach(quasi => {
            const classNames = quasi.value.raw;
            const sortedClassNames = sortClassNames(classNames);
            quasi.value.raw = sortedClassNames;
            quasi.value.cooked = sortedClassNames;
          });
        }
      }
    },
  });

  const { code } = generate(ast, { minified: false, retainLines: true });
  return code;
};