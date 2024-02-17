import { render, cleanup, fireEvent } from "@testing-library/react";
import OTPInputGroup from "./index";
import { expect, test, afterEach, mock } from "bun:test";

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

test("right arrow focuses next input", () => {
  const wrapper = render(<OTPInputGroup />);
  const input1 = wrapper.getByTestId("input1");
  const input2 = wrapper.getByTestId("input2");
  input1.focus();
  fireEvent.change(input1, { target: { value: "1" } });
  fireEvent.keyUp(input1, { key: "ArrowRight" });
  expect(document.activeElement).toBe(input2);
});

test("left arrow focuses previous input", () => {
  const wrapper = render(<OTPInputGroup />);
  const input1 = wrapper.getByTestId("input1");
  const input2 = wrapper.getByTestId("input2");
  input2.focus();
  fireEvent.keyUp(input1, { key: "ArrowLeft" });
  expect(document.activeElement).toBe(input2);
});

test("left arrow does not focus previous input if value is empty", () => {
  const wrapper = render(<OTPInputGroup />);
  const input1 = wrapper.getByTestId("input1");
  input1.focus();
  fireEvent.keyUp(input1, { key: "ArrowLeft" });
  expect(document.activeElement).toBe(input1);
});

test("backspace does not focus previous input if value is empty", () => {
  const wrapper = render(<OTPInputGroup />);
  const input1 = wrapper.getByTestId("input1");
  input1.focus();
  fireEvent.keyUp(input1, { key: "Backspace" });
  expect(document.activeElement).toBe(input1);
});

test("backspace focuses previous input", () => {
  const wrapper = render(<OTPInputGroup />);
  const input1 = wrapper.getByTestId("input1");
  const input2 = wrapper.getByTestId("input2");
  fireEvent.change(input1, { target: { value: "1" } });
  fireEvent.keyUp(input2, { key: "Backspace" });
  expect(document.activeElement).toBe(input1);
});

test("show separtator", () => {
  const wrapper = render(
    <OTPInputGroup
      inputSeparatorRender={() => <span>$ndash;</span>}
      length={4}
    />,
  );

  const dashSeparatorElements = wrapper.getAllByText("$ndash;");
  expect(dashSeparatorElements).toHaveLength(3);
});

test("onChange is called when input value changes", () => {
  const onChange = mock(() => { });
  const wrapper = render(<OTPInputGroup onChange={onChange} />);
  const input1 = wrapper.getByTestId("input1");
  fireEvent.change(input1, { target: { value: "1" } });
  expect(onChange).toHaveBeenCalled();
});

test("onSubmit is called when last input value is entered", () => {
  const onSubmit = mock(() => { });
  const wrapper = render(<OTPInputGroup onSubmit={onSubmit} length={6} />);
  const lastInput = wrapper.getByTestId("input6");
  lastInput.focus();
  fireEvent.keyUp(lastInput, { key: "100" });
  expect(onSubmit).toHaveBeenCalled();
});
