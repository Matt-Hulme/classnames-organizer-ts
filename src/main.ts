const { mockData } = require("./mockData.ts");
const {
  sortClassNames: sortClassNamesFunction,
} = require("./sortClassNames.ts");

interface MockItem {
  id: number;
  classNames: string;
}

const sortedData = () => {
  return mockData.map((mockItem: MockItem) => {
    return sortClassNamesFunction(mockItem.classNames);
  });
};

const sortedClassNames = sortedData();

console.log("mockData:", mockData);
console.log("Sorted Data:", sortedClassNames);
