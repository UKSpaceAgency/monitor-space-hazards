export const roundedPercent = (value: number, decimalPlaces: number = 3) => {
  return `${(value * 100).toFixed(decimalPlaces)}%`;
};

export const getAbsoluteValue = (num: number | undefined | null) => {
  if (!num && num !== 0) {
    return;
  }

  return Math.abs(num);
};
