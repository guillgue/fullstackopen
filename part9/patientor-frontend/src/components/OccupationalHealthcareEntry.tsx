import { OccupationalHealthcare } from "../types";
import DiagnosisList from "./DiagnosisList";

import WorkIcon from "@material-ui/icons/Work";

const OccupationalHealthcareEntry = ({
  entry,
}: {
  entry: OccupationalHealthcare;
}) => {
  return (
    <div>
      <div>
        {entry.date} <WorkIcon /> {entry.employerName}
      </div>{" "}
      <div>
        <em>{entry.description}</em>
      </div>
      {entry.sickLeave ? (
        <div>
          sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </div>
      ) : null}
      <div> diagnose by {entry.specialist}</div>
      <DiagnosisList codes={entry.diagnosisCodes} />
    </div>
  );
};

export default OccupationalHealthcareEntry;
