import React from 'react';
import { JsxMock3 } from './mocks';
import { parseClassNames } from './utils/';

const main = () => {
    const element = React.createElement(JsxMock3);

    console.log('Original JSX:', element);
    
    const parsedClassNames = parseClassNames(element);
    
    console.log("\nParsed Class Names:", parsedClassNames);
}

main();