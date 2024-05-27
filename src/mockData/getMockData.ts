import { keyBy, sortBy } from "lodash";
import mock_notes from "../mockData/mock_notes.json";
import mock_patients from "../mockData/mock_patients.json";
import mock_notes_small from "../mockData/mock_notes_small.json";
import mock_patients_small from "../mockData/mock_patients_small.json";

// These 2 functions centralize which data is being returned,
// We could do this in a more dynamic way, but for now this is fine
export function getMockNotes() {
  return mock_notes;
}

export function getMockPatients() {
  return keyBy(mock_patients, "id");
}

export interface MockDataLists {
  hospitalNames: string[];
  providerNames: string[];
  genders: string[];
  patientNames: string[];
}

export function getMockDataLists(): MockDataLists {
  const allHospitals = new Set<string>();
  const allProviders = new Set<string>();
  const genderSet = new Set<string>();
  const allNames = new Set<string>();

  getMockNotes().forEach((note) => {
    allHospitals.add(note.hospital_name);
    allProviders.add(note.provider_name);
  });

  Object.values(getMockPatients()).forEach((patient) => {
    genderSet.add(patient.gender);
    allNames.add(patient.name);
  });

  return {
    hospitalNames: sortBy(Array.from(allHospitals)),
    providerNames: sortBy(Array.from(allProviders)),
    genders: sortBy(Array.from(genderSet)),
    patientNames: sortBy(Array.from(allNames)),
  };
}
