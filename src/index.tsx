import { type KeyboardEvent, useState, Fragment } from "react";

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
  const defaultInputValues = Array.from(
    { length: length },
    (_, i) => i + 1,
  ).reduce(
    (acc, cur) => {
      acc[`input${cur}`] = "";
      return acc;
    },
    {} as Record<string, string>,
  );

  const [inputValues, setInputValues] = useState(defaultInputValues);

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

interface OTPInputProps {
  id: string;
  autoFocus?: boolean;
  inputClassName?: string;
  style?: React.CSSProperties;
  nextId: string | null;
  previousId: string | null;
  value: string;
  handleSubmit: () => void;
  onValueChange: (inputId: string, value: string) => void;
}

const OTPInput = ({
  id,
  autoFocus = false,
  inputClassName,
  style,
  nextId,
  previousId,
  value,
  handleSubmit,
  onValueChange,
}: OTPInputProps) => {
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Backspace" || e.key === "ArrowLeft") {
      if (previousId !== null) {
        const prev = document.getElementById(previousId);
        if (prev) prev.focus();
      }
    } else if (
      (e.key >= "0" && e.key <= "57") || //check if key is numeric keys 0 to 9
      (e.key >= "96" && e.key <= "105") || //check if key is numeric keypad keys 0 to 9
      e.key === "ArrowRight" //check if key is right arrow key
    ) {
      if (nextId !== null) {
        const next = document.getElementById(nextId);
        if (value) next?.focus();
      } else {
        const inputGroup = document.getElementById("OTPInputGroup");
        if (inputGroup && inputGroup.dataset["autosubmit"]) {
          handleSubmit();
        }
      }
    }
  };
  return (
    <input
      id={id}
      autoFocus={autoFocus}
      className={`w-10 h-10 text-center border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${inputClassName}`}
      type="text"
      maxLength={1}
      name={id}
      style={style}
      value={value}
      onChange={(e) => onValueChange(id, e.target.value)}
      onKeyUp={handleKeyUp}
    />
  );
};

export default OTPInputGroup;
