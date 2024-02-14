import { render } from "@testing-library/react";
import OTPInput from ".";
import { expect, test } from "bun:test";

test("renders opt input field", () => {
  const wrapper = render(
    <OTPInput
      inputClassName="custom-input"
      id="input1"
      nextId="input2"
      previousId={null}
      value=""
      onValueChange={() => { }}
      handleSubmit={() => { }}
    />,
  );

  expect(wrapper.container.querySelector("input")).not.toBeNull();
});
