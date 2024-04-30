import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import { sortClassNames } from './sortClassNames';

export const parseClassNames = (tsxCode: string): string => {
  const ast = parser.parse(tsxCode, { sourceType: 'module', plugins: ['jsx', 'typescript', 'importMeta', 'dynamicImport'] });

  traverse(ast, {
    StringLiteral(path) {
      const classNames = path.node.value;
      const sortedClassNames = sortClassNames(classNames);
      path.node.value = sortedClassNames;
    },
  });

  const { code } = generate(ast, { minified: true });
  return code;
};