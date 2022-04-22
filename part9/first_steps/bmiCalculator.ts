interface parsedMeasurement {
  weight: number;
  height: number;
}

const parseMeasurement = (args: Array<string>): parsedMeasurement => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight)) {
    return { height, weight };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) {
    throw new Error("can't divide by zero!");
  }
  let bmi = (10000 * weight) / (height * height);
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else {
    return "Overweight";
  }
};

try {
  const { height, weight } = parseMeasurement(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
