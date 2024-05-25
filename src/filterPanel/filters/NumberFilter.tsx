import { TextField } from "@mui/material";

type NumberFilterProps = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

export function NumberFilter ({value, onChange}: NumberFilterProps) {
  return (
  <TextField type='number' variant="outlined" size='small' value={value} onChange={e => onChange(Number(e.target.value))} />
  )
}