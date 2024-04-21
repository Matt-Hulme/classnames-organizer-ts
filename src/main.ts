import ReactDOMServer from 'react-dom/server';
import { JsxMock } from './mocks';
import { parseClassNames } from './utils/'
import React from 'react';

// Create a ReactElement from TypedJsxMock
const mockComponent = React.createElement(JsxMock);

// Convert MockComponent to string
const mockComponentString = ReactDOMServer.renderToStaticMarkup(mockComponent);

// Pass the stringified MockComponent to parseClassNames
const parsedClassNames = parseClassNames(mockComponentString);

console.log("Parsed Class Names:", parsedClassNames);