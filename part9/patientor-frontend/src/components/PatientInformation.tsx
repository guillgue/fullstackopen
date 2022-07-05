import React from "react";
import { apiBaseUrl } from "./../constants";
import { useParams } from "react-router-dom";
import { updatePatient, useStateValue } from "../state";
import axios from "axios";
import { Entry, Patient } from "../types";
import Hospital from "./Hospital";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheck from "./HealthCheck";
import { Box } from "@material-ui/core";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
  return null;
};

const PatientInformation = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async () => {
      if (id && patients[id] && !patients[id].ssn) {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatient();
  });

  if (!id) {
    return null;
  }

  const patient = patients[id];

  return (
    <div>
      <h2>{patient?.name}</h2>
      <div>gender: {patient?.gender}</div>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <h3>entries</h3>
      {patient && patient.entries
        ? patient.entries.map((e) => (
            <Box key={e.id} border={1}>
              <EntryDetails entry={e} />
            </Box>
          ))
        : null}
    </div>
  );
};

export default PatientInformation;
