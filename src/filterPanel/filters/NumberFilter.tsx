import { Box, TextField, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

type NumberFilterProps = {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
};

export function NumberFilter({ value, onChange }: NumberFilterProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        type="number"
        variant="outlined"
        size="small"
        value={value || ""}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <Box>
        <IconButton size="small" onClick={() => onChange(undefined)}>
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  );
}
