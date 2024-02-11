import { render, cleanup, fireEvent } from "@testing-library/react";
import OTPInputGroup from "./index";
import { expect, test, afterEach } from "bun:test";

afterEach(() => {
  cleanup();
});

test("renders OTPInputGroup with default props", () => {
  const wrapper = render(<OTPInputGroup />);
  const otpInputGroup = wrapper.getByTestId("OTPInputGroup");
  expect(otpInputGroup?.children).toHaveLength(4);
});

test("renders OTPInputGroup with custom length", () => {
  const wrapper = render(<OTPInputGroup length={6} />);
  const otpInputGroup = wrapper.getByTestId("OTPInputGroup");
  expect(otpInputGroup?.children).toHaveLength(6);
});

test("renders OTPInputGroup with custom inputClassName", () => {
  const wrapper = render(<OTPInputGroup inputGroupClassName="custom-input" />);
  const otpInput = wrapper.getByTestId("OTPInputGroup");
  expect(otpInput?.classList.contains("custom-input")).toBe(true);
});

test("right arrow does not focus next input if value is empty", () => {
  const wrapper = render(<OTPInputGroup />);
  const input1 = wrapper.getByTestId("input1");
  const input2 = wrapper.getByTestId("input2");
  input1.focus();
  fireEvent.keyUp(input1, { key: "ArrowRight" });
  expect(document.activeElement).not.toBe(input2);
});

test("left arrow focuses previous input", () => {
  const wrapper = render(<OTPInputGroup />);
  const input1 = wrapper.getByTestId("input1");
  const input2 = wrapper.getByTestId("input2");
  input2.focus();
  fireEvent.keyUp(input1, { key: "ArrowLeft" });
  expect(document.activeElement).toBe(input2);
});
