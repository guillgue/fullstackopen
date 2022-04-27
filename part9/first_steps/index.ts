import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    res.status(200).send({ weight, height, bmi: calculateBmi(height, weight) });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: "parameters missing" });
  }
  if (typeof target !== "number") {
    return res.status(400).send({ error: "malformatted parameters" });
  }
  if (typeof daily_exercises === "object") {
    for (const e of daily_exercises) {
      if (typeof e !== "number") {
        return res.status(400).send({ error: "malformatted parameters" });
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.status(200).send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
