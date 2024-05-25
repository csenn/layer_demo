import { Box, IconButton, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

type TextFilterProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TextFilter({ value, onChange }: TextFilterProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Box>
        <IconButton size="small" onClick={() => onChange("")}>
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
}
