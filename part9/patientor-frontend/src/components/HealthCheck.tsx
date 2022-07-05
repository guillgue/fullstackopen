import { HealthCheckEntry, HealthCheckRating } from "../types";

import HealingIcon from "@material-ui/icons/Healing";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DiagnosisList from "./DiagnosisList";
import { green, yellow, red, purple } from "@material-ui/core/colors";

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  let HealthIcon = null;
  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      HealthIcon = <FavoriteIcon style={{ color: green[500] }} />;
      break;
    case HealthCheckRating.LowRisk:
      HealthIcon = <FavoriteIcon style={{ color: yellow[500] }} />;
      break;
    case HealthCheckRating.HighRisk:
      HealthIcon = <FavoriteIcon style={{ color: red[500] }} />;
      break;
    case HealthCheckRating.CriticalRisk:
      HealthIcon = <FavoriteIcon style={{ color: purple[500] }} />;
      break;
  }
  return (
    <div>
      <div>
        {entry.date} <HealingIcon />
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      <div>{HealthIcon}</div>
      <div>diagnose by {entry.specialist}</div>
      <DiagnosisList codes={entry.diagnosisCodes} />
    </div>
  );
};

export default HealthCheck;
