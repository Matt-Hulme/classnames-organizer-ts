export const sortClassNames = (classNamesString: string): string => {
  const classNamesArray: string[] = classNamesString.split(" ").sort();
  const standardClassNames: string[] = [];
  const mdClassNames: string[] = [];
  const lgClassNames: string[] = [];
  const pseudoClassNames: string[] = [];

  for (let i = 0; i < classNamesArray.length; i++) {
    const className = classNamesArray[i].toLowerCase();

    if (className.startsWith("md:")) {
      mdClassNames.push(className);
    } else if (className.startsWith("lg:")) {
      lgClassNames.push(className);
    } else if (className.includes(":")) {
      pseudoClassNames.push(className);
    } else if (className !== '') {
      standardClassNames.push(className);
    }
  }

  const sortedClassNamesArray: string[] = [
    ...standardClassNames,
    ...pseudoClassNames,
    ...lgClassNames,
    ...mdClassNames,
  ];

  const sortedClassNames: string = sortedClassNamesArray.join(" ");

  return sortedClassNames;
};