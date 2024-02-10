import { render } from "@testing-library/react";
import OTPInputGroup from "./index";
import { expect, test } from "bun:test";

test("renders OTPInputGroup with default props", () => {
  render(<OTPInputGroup />);
  const otpInputGroup = document.getElementById("OTPInputGroup");
  console.log(otpInputGroup?.lastElementChild?.id);
  expect(otpInputGroup?.children).toHaveLength(4);
});
