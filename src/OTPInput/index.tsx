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
  const handleRightMove = () => {
    if (nextId !== null) {
      const next = document.getElementById(nextId);
      if (value) next?.focus();
    } else {
      handleSubmit();
    }
  };

  const handleLeftMove = () => {
    if (previousId !== null) {
      const prev = document.getElementById(previousId);
      prev?.focus();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "Backspace" || e.key === "ArrowLeft") handleLeftMove();

    if ((e.key >= "0" && e.key <= "9") || e.key === "ArrowRight")
      handleRightMove();

    if (e.key === "Enter") handleSubmit();

    if (e.key >= "0" && e.key <= "9") {
      onValueChange(id, e.key);
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
      style={style}
      value={value}
      onPaste={onPaste}
      onChange={(e) => onValueChange(id, e.target.value)}
      onKeyUp={handleKeyUp}
    />
  );
}
