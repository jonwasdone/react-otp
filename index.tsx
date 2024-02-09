import { type KeyboardEvent, useState } from "react";

interface OTPInputGroupProps {
  onSubmit: (value: string) => void;
}

const OTPInputGroup = ({ onSubmit }: OTPInputGroupProps) => {
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });
  const handleInputChange = (inputId: string, value: string) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputId]: value,
    }));
  };

  const handleSubmit = () => {
    const value = Object.values(inputValues).join("");
    onSubmit(value);
  };

  return (
    <>
      <div
        id="OTPInputGroup"
        data-autosubmit="true"
        className="flex items-center gap-4"
      >
        <OTPInput
          id="input1"
          value={inputValues.input1}
          onValueChange={handleInputChange}
          previousId={null}
          handleSubmit={handleSubmit}
          nextId="input2"
          autoFocus
        />
        <OTPInput
          id="input2"
          value={inputValues.input2}
          onValueChange={handleInputChange}
          previousId="input1"
          nextId="input3"
          handleSubmit={handleSubmit}
        />
        <OTPInput
          id="input3"
          value={inputValues.input3}
          onValueChange={handleInputChange}
          previousId="input2"
          nextId="input4"
          handleSubmit={handleSubmit}
        />
        <span>&ndash;</span>
        <OTPInput
          id="input4"
          value={inputValues.input4}
          onValueChange={handleInputChange}
          previousId="input3"
          nextId="input5"
          handleSubmit={handleSubmit}
        />
        <OTPInput
          id="input5"
          value={inputValues.input5}
          onValueChange={handleInputChange}
          previousId="input4"
          nextId="input6"
          handleSubmit={handleSubmit}
        />
        <OTPInput
          id="input6"
          value={inputValues.input6}
          onValueChange={handleInputChange}
          previousId="input5"
          nextId={null}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

interface OTPInputProps {
  id: string;
  previousId: string | null;
  nextId: string | null;
  value: string;
  onValueChange: (inputId: string, value: string) => void;
  handleSubmit: () => void;
  autoFocus?: boolean;
}

const OTPInput = ({
  id,
  previousId,
  nextId,
  value,
  onValueChange,
  handleSubmit,
  autoFocus = false,
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
      name={id}
      type="text"
      value={value}
      className="w-10 h-10 text-center border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      maxLength={1}
      onChange={(e) => onValueChange(id, e.target.value)}
      onKeyUp={handleKeyUp}
      autoFocus={autoFocus}
    />
  );
};

export default OTPInputGroup;
