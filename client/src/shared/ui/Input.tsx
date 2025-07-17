import { TextField } from "@mui/material";
import type { ChangeEvent } from "react";

interface InputProps {
  label: string;
  placeholder?: string;

  type?: "text" | "number";
  value: string | number;

  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  variant?: "outlined" | "filled" | "standard";
  multiline?: boolean;

  min?: number;
  max?: number;
}

export function Input({
  label,
  value,
  onChange,
  variant = "outlined",
  placeholder,
  type = "text",
  multiline = false,
  min,
  max,
}: InputProps) {
  return (
    <TextField
      className="w-full"
      type={type}
      label={label}
      value={value}
      onChange={(e) => onChange(e)}
      variant={variant}
      placeholder={placeholder}
      multiline={multiline}
      inputProps={{
        min: min,
        max: max,
      }}
    />
  );
}
