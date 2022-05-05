/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

patientRouter.post("/", (req, res) => {
  const { name, occupation, gender, ssn, dateOfBirth } = req.body;
  const newPatientEntry = patientService.addPatient({
    name,
    occupation,
    gender,
    ssn,
    dateOfBirth,
  });
  res.json(newPatientEntry);
});

export default patientRouter;
