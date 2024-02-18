import { expect, test } from "bun:test";
import { parseIdValuesToText, parseTextToIdValues } from "./utils";

test("parseIdValuesToText", () => {
  const inputValues = {
    input1: "1",
    input2: "2",
    input3: "3",
    input4: "4",
  };
  expect(parseIdValuesToText(inputValues)).toBe("1234");
});

test("parseTextToIdValues", () => {
  const defaultValue = "1234";

  expect(parseTextToIdValues(defaultValue, 4)).toEqual({
    input1: "1",
    input2: "2",
    input3: "3",
    input4: "4",
  });
});
