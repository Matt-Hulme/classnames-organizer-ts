import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import { sortClassNames } from './sortClassNames';

export const parseClassNames = (tsxCode: string): string => {
  const ast = parser.parse(tsxCode, { sourceType: 'module', plugins: ['jsx', 'typescript', 'importMeta', 'dynamicImport'] });

  traverse(ast, {
    // Handle string literals
    StringLiteral(path) {
      const classNames = path.node.value;
      const sortedClassNames = sortClassNames(classNames);
      path.node.value = sortedClassNames;
    },
    // Handle classNames package usage
    CallExpression(path) {
      if (path.node.callee.name === 'classNames') {
        path.node.arguments.forEach(arg => {
          if (arg.type === 'StringLiteral') {
            const classNames = arg.value;
            const sortedClassNames = sortClassNames(classNames);
            arg.value = sortedClassNames;
          }
        });
      }
    },
    // Handle ternaries
    ConditionalExpression(path) {
      ['consequent', 'alternate'].forEach(key => {
        const branch = path.node[key];
        if (branch.type === 'TemplateLiteral') {
          branch.quasis.forEach(quasi => {
            const classNames = quasi.value.raw;
            const sortedClassNames = sortClassNames(classNames);
            quasi.value.raw = sortedClassNames;
            quasi.value.cooked = sortedClassNames;
          });
        }
      });
    },
  });

  const { code } = generate(ast, { minified: true });
  return code;
};