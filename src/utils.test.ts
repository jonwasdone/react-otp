import { expect, test } from "bun:test";
import { parseInputValues } from "./utils";

test("parseInputValues", () => {
  const inputValues = {
    input1: "1",
    input2: "2",
    input3: "3",
    input4: "4",
  };
  expect(parseInputValues(inputValues)).toBe("1234");
});
