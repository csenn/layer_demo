import { Box, Paper, TablePagination } from "@mui/material";
import { groupNotes } from "./groupNotes";
import { PatientNote } from "./Note";
import { PatientDetails } from "./PatientDetails";
import { INote } from "../types";
import { useMemo } from "react";
import { take, drop } from "lodash";
import { getMockPatients } from "../mockData/getMockData";

type NotePageProps = {
  filteredNotes: INote[];
  noteFilter?: string;
  pageNumber: number;
  updatePageNumber: (pageNumber: number) => void;
};

export function NotePage({
  filteredNotes,
  noteFilter,
  pageNumber,
  updatePageNumber,
}: NotePageProps) {
  const patients = useMemo(() => getMockPatients(), []);

  const patientGroups = useMemo(
    () => groupNotes(filteredNotes, patients),
    [filteredNotes, patients],
  );

  const pagePatients = useMemo(
    () => take(drop(patientGroups, pageNumber * 10), 10),
    [patientGroups, pageNumber],
  );

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ padding: "25px", flexGrow: 1, overflowY: "scroll" }}>
        {pagePatients.map((group) => (
          <Box key={group.id} sx={{ marginBottom: "20px" }}>
            <Paper sx={{ marginBottom: "30px" }}>
              {/* Assume patient can be found for each note, just check for safety */}
              {!!patients[group.id] && (
                <PatientDetails patient={patients[group.id]} />
              )}

              {group.notes.map((note, index) => (
                <PatientNote
                  key={note.id}
                  note={note}
                  noteIndex={index}
                  noteFilter={noteFilter}
                />
              ))}
            </Paper>
          </Box>
        ))}
      </Box>
      <Paper
        square
        sx={{
          padding: "5px 15px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {patientGroups.length} Patients found with {filteredNotes.length}{" "}
          notes
        </Box>
        <TablePagination
          component="div"
          count={patientGroups.length}
          page={pageNumber}
          onPageChange={(e, page) => updatePageNumber(page)}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
        />
      </Paper>
    </Box>
  );
}
