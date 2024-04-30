import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import { sortClassNames } from './sortClassNames';

export const parseClassNames = (jsxCode: string): string => {
  const ast = parser.parse(jsxCode, { sourceType: 'module', plugins: ['jsx', 'importMeta', 'dynamicImport'] });

  traverse(ast, {
    StringLiteral(path) {
      const classNames = path.node.value;
      const sortedClassNames = sortClassNames(classNames);
      path.node.value = sortedClassNames;
    },
  });

  const { code } = generate(ast);
  return code;
};