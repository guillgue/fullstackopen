const calculateBmi = (height: number, weight: number): string => {
  if (weight === 0) {
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

console.log(calculateBmi(179, 70));
