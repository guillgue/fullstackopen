import patientEntries from "../../data/patients";
import { NonSensitivePatientEntry, PatientEntry } from "../types";

const getEntries = (): Array<PatientEntry> => {
  return patientEntries;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return patientEntries.map(
    ({ id, name, occupation, gender, dateOfBirth }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth,
    })
  );
};

export default { getEntries, getNonSensitiveEntries };
