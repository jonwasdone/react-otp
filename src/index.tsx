import React, { useState, Fragment, useEffect } from "react";
import OTPInput from "./OTPInput";
import { parseIdValuesToText, parseTextToIdValues } from "./utils";

interface OTPInputGroupProps {
  autoFocus?: boolean;
  inputClassName?: string;
  inputGroupClassName?: string;
  defaultValue?: string;
  value?: string;
  style?: React.CSSProperties;
  length?: number;
  type?: "text" | "number";
  inputMode?: "numeric" | "text";
  inputSeparatorRender?: (inputId?: number) => JSX.Element | undefined;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const OTPInputGroup = ({
  autoFocus = true,
  inputClassName = "",
  inputGroupClassName = "",
  defaultValue = "",
  value,
  length = 4,
  style = {},
  type = "text",
  inputMode = "text",
  inputSeparatorRender,
  onChange,
  onSubmit,
  onPaste,
}: OTPInputGroupProps) => {
  const defaultInputIdValues = parseTextToIdValues(defaultValue, length);

  const [inputValues, setInputValues] = useState(defaultInputIdValues);

  const handleInputChange = (inputId: string, value: string) => {
    setInputValues((prevInputValues) => {
      const newInputValues = { ...prevInputValues, [inputId]: value };
      onChange && onChange(parseIdValuesToText(newInputValues));
      return newInputValues;
    });
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(parseIdValuesToText(inputValues));
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text/plain").split("");
    setInputValues((prevInputValues) => {
      const newInputValues = { ...prevInputValues };
      for (let i = 1; i <= length; i++) {
        if (pastedData[i - 1]) newInputValues[`input${i}`] = pastedData[i - 1];
      }
      return newInputValues;
    });

    onPaste && onPaste(e);
    onSubmit && onSubmit(e.clipboardData.getData("text/plain"));
  };

  useEffect(() => {
    if (value && value.length === length) {
      setInputValues(parseTextToIdValues(value, length));
    }
  }, [value, length]);

  return (
    <Fragment>
      <div
        id="OTPInputGroup"
        className={`flex items-center gap-4 ${inputGroupClassName}`}
        data-testid="OTPInputGroup"
      >
        {Array.from({ length: length }, (_, i) => i + 1).map((i) => (
          <Fragment key={`input${i}`}>
            <OTPInput
              id={`input${i}`}
              autoFocus={autoFocus && i === 1}
              type={type}
              inputMode={inputMode}
              inputClassName={inputClassName}
              style={style}
              nextId={i === length ? null : `input${i + 1}`}
              previousId={i === 1 ? null : `input${i - 1}`}
              value={inputValues[`input${i}`]}
              handleSubmit={handleSubmit}
              onValueChange={handleInputChange}
              onPaste={handlePaste}
            />
            {inputSeparatorRender && i !== length && inputSeparatorRender(i)}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export type { OTPInputGroupProps };
export default OTPInputGroup;
