import { useState, Fragment } from "react";
import OTPInput from "./OTPInput";
import "./index.css";

interface OTPInputGroupProps {
  autoFocus?: boolean;
  inputClassName?: string;
  inputGroupClassName?: string;
  style?: React.CSSProperties;
  length?: number;
  inputSeparatorRender?: (inputId?: number) => JSX.Element | undefined;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
}

const OTPInputGroup = ({
  autoFocus = true,
  inputClassName = "",
  inputGroupClassName = "",
  length = 4,
  style = {},
  inputSeparatorRender,
  onChange,
  onSubmit,
}: OTPInputGroupProps) => {
  const defaultInputIdValues = Array.from(
    { length: length },
    (_, i) => i + 1,
  ).reduce(
    (acc, cur) => {
      acc[`input${cur}`] = "";
      return acc;
    },
    {} as Record<string, string>,
  );

  const [inputValues, setInputValues] = useState(defaultInputIdValues);

  const parseInputValues = (inputValues: Record<string, string>) => {
    return Object.values(inputValues).join("");
  };

  const handleInputChange = (inputId: string, value: string) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputId]: value,
    }));
    onChange && onChange(parseInputValues(inputValues));
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(parseInputValues(inputValues));
  };

  return (
    <Fragment>
      <div
        id="OTPInputGroup"
        data-autosubmit="true"
        className={`flex items-center gap-4 ${inputGroupClassName}`}
        data-testid="OTPInputGroup"
      >
        {Array.from({ length: length }, (_, i) => i + 1).map((i) => (
          <Fragment key={`input${i}`}>
            <OTPInput
              id={`input${i}`}
              autoFocus={autoFocus && i === 1}
              inputClassName={inputClassName}
              style={style}
              nextId={i === length ? null : `input${i + 1}`}
              previousId={i === 1 ? null : `input${i - 1}`}
              value={inputValues[`input${i}`]}
              handleSubmit={handleSubmit}
              onValueChange={handleInputChange}
            />
            {inputSeparatorRender && inputSeparatorRender(i)}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export type { OTPInputGroupProps };
export default OTPInputGroup;
