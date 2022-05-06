import { Gender, NewPatientEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseText = (text: unknown, type: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${type}`);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

type Fields = {
  name: unknown;
  occupation: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
  gender: unknown;
};

const toNewPatientEntry = ({
  name,
  occupation,
  ssn,
  dateOfBirth,
  gender,
}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseText(name, "name"),
    occupation: parseText(occupation, "occupation"),
    ssn: parseText(ssn, "ssn"),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
  };

  return newEntry;
};

export default toNewPatientEntry;
