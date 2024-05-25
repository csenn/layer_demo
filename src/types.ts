export interface INote {
  /** The id of the note. */
  id: number;
  /** The name of the provider (doctor) who wrote the note. */
  provider_name: string;
  /** the name of the hospital where the note was written. */
  hospital_name: string;
  /** The date the note was written formatted as an ISO 8601 date string. */
  creation_date: string;
  /** The id of the patient associated with the note. */
  patient_id: number;
  /** The text contents of the note. */
  text: string;
}

export interface IPatient {
  /** The id of the patient. */
  id: number;
  /** The name of the patient. */
  name: string;
  /** The gender of the patient. */
  gender: string;
  /** An ISO 8601 date string. */
  date_of_birth: string;
}
