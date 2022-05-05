import patientEntries from "../../data/patients";
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "../types";
import { v1 as uuid } from "uuid";

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

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getNonSensitiveEntries, addPatient };
