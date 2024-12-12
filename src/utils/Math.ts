export const roundedPercent = (value: number, decimalPlaces: number = 3) => {
  return `${(value * 100).toFixed(decimalPlaces)}%`;
};
