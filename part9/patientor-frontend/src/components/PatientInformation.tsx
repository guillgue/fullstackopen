import React from "react";
import { apiBaseUrl } from "./../constants";
import { useParams } from "react-router-dom";
import { updatePatient, useStateValue } from "../state";
import axios from "axios";
import { Patient } from "../types";

const PatientInformation = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async () => {
      if (id && !patients[id].ssn) {
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
      <h4>{patient.name}</h4>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
    </div>
  );
};

export default PatientInformation;
