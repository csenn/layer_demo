import { Box } from "@mui/material";
import { ReactNode } from "react";

export function FilterWrapper({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <Box>
      <Box
        sx={{ paddingTop: "15px", paddingBottom: "5px", fontWeight: "bold" }}
      >
        {label}
      </Box>
      {children}
    </Box>
  );
}
