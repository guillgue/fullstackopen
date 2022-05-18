import patientEntries from "../../data/patients";
import { NewPatient, PublicPatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getPatient = (id: string): Patient | undefined => {
  return patientEntries.find((p) => p.id === id);
};

const getEntries = (): Array<Patient> => {
  return patientEntries;
};

const getNonSensitiveEntries = (): Array<PublicPatient> => {
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

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry,
  };

  patientEntries.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatient, getEntries, getNonSensitiveEntries, addPatient };
