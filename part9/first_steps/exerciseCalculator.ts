interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

// division by zero?
const calculateExercises = (daily: Array<number>, target: number): Result => {
  const periodLength = daily.length;
  const trainingDays = daily.filter((n) => n > 0).length;
  const average = daily.reduce((a, b) => a + b) / periodLength;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
