import { HospitalEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div>
      <div>
        {entry.date} <LocalHospitalIcon />
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      <div>
        discharge: {entry.discharge.date} {entry.discharge.criteria}
      </div>
      <div>diagnose by {entry.specialist}</div>
      <DiagnosisList codes={entry.diagnosisCodes} />
    </div>
  );
};

export default Hospital;
