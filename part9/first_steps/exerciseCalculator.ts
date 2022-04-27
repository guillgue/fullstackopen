interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

interface parsedExercises {
  target: number;
  exercises: Array<number>;
}

const parseExercises = (args: Array<string>): parsedExercises => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);

  if (isNaN(target)) {
    throw new Error("Provided values were not numbers!");
  }

  const exercises = new Array(args.length - 3).fill(0);

  for (let i = 3; i < args.length; i++) {
    const hours = Number(args[i]);
    if (isNaN(hours)) {
      throw new Error("Provided values were not numbers!");
    }
    exercises[i - 3] = hours;
  }

  return { target, exercises };
};

export const calculateExercises = (
  exercises: Array<number>,
  target: number
): Result => {
  const periodLength = exercises.length;
  const trainingDays = exercises.filter((n) => n > 0).length;
  const average = exercises.reduce((a, b) => a + b) / periodLength;
  const score = target === 0 ? 1 : average / target;

  let rating: 1 | 2 | 3 = 1;
  let ratingDescription = "bad";
  let success = false;

  if (score >= 1) {
    rating = 3;
    ratingDescription = "good";
    success = true;
  } else if (score >= 0.85) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  return {
    periodLength,
    trainingDays,
    success,
    average,
    rating,
    ratingDescription,
    target,
  };
};

try {
  const { target, exercises } = parseExercises(process.argv);
  console.log(calculateExercises(exercises, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
