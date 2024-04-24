import { jsxMock } from './mocks';
import { parseClassNames } from './utils/';


console.log('Original JSX:', jsxMock);

const parsedClassNames = parseClassNames(jsxMock);

console.log("\nParsed Class Names:", parsedClassNames);