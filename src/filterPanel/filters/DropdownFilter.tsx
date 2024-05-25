import { Box, IconButton, MenuItem, Select } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

type DropdownFilterProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}



export function DropdownFilter({value, onChange, options}: DropdownFilterProps) {
  return (
    <Box sx={{display: 'flex'}}>

    
      <Select
      fullWidth
      size="small"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {options.map(option => (
        <MenuItem key={option} value={option}>{option}</MenuItem>
      ))}
    </Select>
    <IconButton size='small' onClick={() => onChange('')}>
  <ClearIcon fontSize="inherit"  />
</IconButton>

  </Box>
  )
}