import ReactDOMServer from 'react-dom/server';
import { jsxMock } from './mocks';
import { parseClassNames } from './utils/';

// Convert MockComponent to string
const mockComponentString = ReactDOMServer.renderToStaticMarkup(jsxMock);

// Pass the stringified MockComponent to parseClassNames
const parsedClassNames = parseClassNames(mockComponentString);

console.log('mockComponentString:', mockComponentString);

console.log("\nParsed Class Names:", parsedClassNames);