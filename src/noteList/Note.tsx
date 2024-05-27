import { Box } from "@mui/material";
import { INote } from "../types";
import { useState } from "react";
import dayjs from "dayjs";
import Highlighter from "react-highlight-words";
import ExpandLessIcon from "@mui/icons-material/ChevronLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function RowLabel({ label }: { label: string }) {
  return (
    <Box
      component="span"
      sx={{
        marginLeft: "30px",
        color: "#1E88E5",
        marginRight: "5px",
      }}
    >
      {label}:
    </Box>
  );
}

type NoteProps = {
  note: INote;
  noteIndex: number;
  noteFilter?: string;
};

export function PatientNote({ note, noteIndex, noteFilter }: NoteProps) {
  // Keep collapsed in state here, it could also be held
  // in a redux like data store
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <Box sx={{ border: "1px solid rgb(230,230,230)", borderTop: 0 }}>
      <Box
        sx={{
          display: "flex",
          padding: "7px",
          gap: "10px",
          // background: '#B3E5FC'
          borderBottom: "1px solid rgb(230,230,230)",
        }}
      >
        <Box>
          <strong>Note {noteIndex + 1}</strong>
        </Box>
        <Box>
          <RowLabel label="Hospital" />
          {note.hospital_name}
        </Box>

        <Box>
          <RowLabel label="Provider" />
          {note.provider_name}
        </Box>

        <Box>
          <RowLabel label="Created" />
          {dayjs(note.creation_date).format("MM/DD/YYYY")}
        </Box>
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box
            sx={{
              height: isCollapsed ? "64px" : undefined,
              overflowY: "hidden",
              lineHeight: 1.4,
              fontWeight: 300,
              padding: "7px",
            }}
          >
            <Highlighter
              searchWords={[noteFilter || ""]}
              autoEscape={true}
              // Small optimization, only render/highlight first 500 characters if collapsed
              textToHighlight={
                isCollapsed ? note.text.slice(0, 500) : note.text
              }
            />
          </Box>
          <Box
            onClick={toggleCollapse}
            sx={{
              verticalAlign: "center",
              minWidth: "50px",
              textAlign: "center",
              paddingTop: "25px",
              cursor: "pointer",
            }}
          >
            {isCollapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
