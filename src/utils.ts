export const parseIdValuesToText = (inputValues: Record<string, string>) => {
  return Object.values(inputValues).join("");
};

export const parseTextToIdValues = (defaultValue: string, length: number) =>
  Array.from({ length: length }, (_, i) => i + 1).reduce(
    (acc, cur) => {
      acc[`input${cur}`] = defaultValue[cur - 1] || "";
      return acc;
    },
    {} as Record<string, string>,
  );
