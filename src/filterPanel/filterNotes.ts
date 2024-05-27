import { getMockNotes, getMockPatients } from "../mockData/getMockData";
import { INote } from "../types";
import dayjs from "dayjs";

export interface IFilterOptions {
  note?: string;
  patientName?: string;
  hospitalName?: string;
  providerName?: string;
  maxAge?: number;
  minAge?: number;
  gender?: string;
}

/**
 * Helper function to filter notes based on filter options
 * We do all checks in a single filter function. Another options
 * would be to chain filter functions together. This approach
 * is more efficient because we are only doing a single pass,
 * but slightly less "functional" and nice to test.
 */
export function filterNotes(filterOptions: IFilterOptions): INote[] {
  const patients = getMockPatients();
  return getMockNotes().filter((note) => {
    const patient = patients[note.patient_id];

    if (
      filterOptions.hospitalName &&
      note.hospital_name !== filterOptions.hospitalName
    ) {
      return false;
    }

    if (
      filterOptions.providerName &&
      note.provider_name !== filterOptions.providerName
    ) {
      return false;
    }

    // Check if the age is over maxAge (ignore age of 0)
    if (filterOptions.gender && patient.gender !== filterOptions.gender) {
      return false;
    }

    // Looking for exact match on name, in reality would want partial matches on names
    if (
      filterOptions.patientName &&
      patient.name !== filterOptions.patientName
    ) {
      return false;
    }

    const patientAge = dayjs().diff(patient.date_of_birth, "year");

    // Check if the age is over maxAge (ignore age of 0)
    if (filterOptions.maxAge && patientAge > (filterOptions.maxAge as number)) {
      return false;
    }

    // Check if the age is under minAge (ignore age of 0)
    if (filterOptions.minAge && patientAge < (filterOptions.minAge as number)) {
      return false;
    }

    // Remove case-insensitive search, we do it repetitively in this function
    // As an optimization, we could compute the lower case version onload
    // There are other options here as well, such as splitting the search into separate
    // words and checking if any exist (rather than requiring the full string to match)
    if (
      filterOptions.note &&
      !note.text.toLowerCase().includes(filterOptions.note.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}
