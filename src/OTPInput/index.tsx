import React, { type KeyboardEvent } from "react";

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
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

export default function OTPInput({
  id,
  autoFocus = false,
  inputClassName,
  style,
  nextId,
  previousId,
  value,
  handleSubmit,
  onValueChange,
  onPaste,
}: OTPInputProps) {
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
      data-testid={id}
      type="text"
      maxLength={1}
      name={id}
      style={style}
      value={value}
      onPaste={onPaste}
      onChange={(e) => onValueChange(id, e.target.value)}
      onKeyUp={handleKeyUp}
    />
  );
}
