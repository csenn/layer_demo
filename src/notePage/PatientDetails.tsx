import { Box } from "@mui/material";
import { IPatient } from "../types";
import dayjs from "dayjs";

type PatientDetailsProps = {
  patient: IPatient;
};

export function PatientDetails({ patient }: PatientDetailsProps) {
  return (
    <Box
      sx={{
        background: "#E3F2FD",
        padding: "20px",
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <Box sx={{ fontSize: "18px", color: "#0D47A1" }}>{patient.name}</Box>

      <Box sx={{ color: "#1E88E5" }}>({patient.gender})</Box>

      <Box sx={{ color: "#1E88E5" }}>
        {dayjs().diff(patient.date_of_birth, "year")} years old
      </Box>
    </Box>
  );
}
