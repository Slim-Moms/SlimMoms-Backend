/**
 * Daily calorie needs calculations for women
 * Equation: 10 * currentWeight + 6.25 * boy - 5 * yaş - 161 - 10 * (currentWeight - desiredWeight)
 * @param age
 * @param height
 * @param currentWeight
 * @param desiredWeight
 * @returns Daily calorie need
 */
export const calorieCalculator = ({
  age,
  height,
  currentWeight,
  desiredWeight,
}) => {
  return (
    10 * currentWeight +
    6.25 * height -
    5 * age -
    161 -
    10 * (currentWeight - desiredWeight)
  );
};
