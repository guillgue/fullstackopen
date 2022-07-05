import { useStateValue } from "../state";
import { Diagnosis } from "../types";

const DiagnosisList = ({
  codes,
}: {
  codes: Array<Diagnosis["code"]> | undefined;
}) => {
  const [{ diagnoses }] = useStateValue();

  if (codes === undefined) {
    return null;
  }

  return (
    <ul>
      {codes.map((d) => (
        <li key={d}>
          {d} {diagnoses[d]?.name}
        </li>
      ))}
    </ul>
  );
};

export default DiagnosisList;
