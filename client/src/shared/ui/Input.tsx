import { TextField, type TextFieldProps } from "@mui/material";

export function Input({ error, helperText, ...props }: TextFieldProps) {
  return (
    <>
      <TextField className="w-full" {...props} />

      {error && <div className="text-red-500">{helperText}</div>}
    </>
  );
}
