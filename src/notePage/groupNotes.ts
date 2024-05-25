import { sortBy } from "lodash";
import { INote, IPatient } from "../types";

interface IPatientGroup extends IPatient {
  notes: INote[];
}

export function groupNotes(
  filteredNotes: INote[],
  patients: Record<string, IPatient>,
): IPatientGroup[] {
  const patientLookup: Record<string, INote[]> = {};

  filteredNotes.forEach((note) => {
    if (!patientLookup[note.patient_id]) {
      patientLookup[note.patient_id] = [];
    }
    patientLookup[note.patient_id].push(note);
  });

  const patientGroups = Object.keys(patientLookup).map((patientId) => {
    const patient = patients[patientId];
    return {
      ...patient,
      notes: sortBy(
        patientLookup[patientId],
        (note) => new Date(note.creation_date),
      ),
    };
  });

  return sortBy(patientGroups, (p) => p.name);
}
