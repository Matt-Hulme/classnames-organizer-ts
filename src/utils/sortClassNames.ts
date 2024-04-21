export const sortClassNames = (classNamesString: string): string => {
  const classNamesArray: string[] = classNamesString.split(" ");
  const standardClassNames: string[] = [];
  const mdClassNames: string[] = [];
  const lgClassNames: string[] = [];
  const otherClassNames: string[] = [];

  for (let i = 0; i < classNamesArray.length; i++) {
    const className = classNamesArray[i];

    if (className.startsWith("md:")) {
      mdClassNames.push(className);
    } else if (className.startsWith("lg:")) {
      lgClassNames.push(className);
    } else if (className.includes(":")) {
      otherClassNames.push(className);
    } else {
      standardClassNames.push(className);
    }
  }

  standardClassNames.sort();
  mdClassNames.sort();
  lgClassNames.sort();
  otherClassNames.sort();

  const sortedClassNamesArray: string[] = [
    ...standardClassNames,
    ...mdClassNames,
    ...lgClassNames,
    ...otherClassNames,
  ];

  const sortedClassNames: string = sortedClassNamesArray.join(" ");

  return sortedClassNames;
};

