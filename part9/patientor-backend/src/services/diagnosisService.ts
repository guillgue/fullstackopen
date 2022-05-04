import diagnoses from "../../data/diagnoses";
import { DiagnosisEntry } from "../types";

const getEntries = (): Array<DiagnosisEntry> => {
  return diagnoses;
};

export default { getEntries };
