import { TextField } from "@mui/material";

type TextFilterProps = {
  value: string;
  onChange: (value: string) => void;
}

export function TextFilter ({value, onChange}: TextFilterProps) {
  return (
  <TextField fullWidth variant="outlined" size='small' value={value} onChange={e => onChange(e.target.value)} />
  )
}