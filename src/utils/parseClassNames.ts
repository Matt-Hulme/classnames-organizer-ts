import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { sortClassNames } from './sortClassNames';
import { Identifier } from '@babel/types';

export const parseClassNames = (tsxCode: string): string => {
  const ast = parser.parse(tsxCode, { sourceType: 'module', plugins: ['jsx', 'typescript', 'importMeta', 'dynamicImport'] });

  const replacements = [];

  traverse(ast, {
    JSXAttribute(path) {
      if (path.node.name.name !== 'className') {
        return;
      }

      if (path.node.value && path.node.value.type === 'StringLiteral') {
        const classNames = path.node.value.value;
        const sortedClassNames = sortClassNames(classNames);
        replacements.push({
          start: path.node.value.start,
          end: path.node.value.end,
          value: `"${sortedClassNames}"`,
        });
      } else if (path.node.value && path.node.value.type === 'JSXExpressionContainer') {
        const { expression } = path.node.value;
        if (expression.type === 'StringLiteral') {
          const classNames = expression.value;
          const sortedClassNames = sortClassNames(classNames);
          replacements.push({
            start: expression.start,
            end: expression.end,
            value: `"${sortedClassNames}"`,
          });
        } else if (expression.type === 'CallExpression' && (expression.callee as Identifier).name === 'classNames') {
          expression.arguments.forEach(arg => {
            if (arg.type === 'StringLiteral') {
              const classNames = arg.value;
              const sortedClassNames = sortClassNames(classNames);
              replacements.push({
                start: arg.start,
                end: arg.end,
                value: `"${sortedClassNames}"`,
              });
            }
          });
        } else if (expression.type === 'TemplateLiteral') {
          expression.quasis.forEach(quasi => {
            const classNames = quasi.value.raw;
            const sortedClassNames = sortClassNames(classNames);
            replacements.push({
              start: quasi.start,
              end: quasi.end,
              value: `\`${sortedClassNames}\``,
            });
          });
        }
      }
    },
  });

  // Apply replacements from the end of the code to the start
  replacements.sort((a, b) => b.start - a.start);
  for (const { start, end, value } of replacements) {
    tsxCode = tsxCode.slice(0, start) + value + tsxCode.slice(end);
  }

  return tsxCode;
};