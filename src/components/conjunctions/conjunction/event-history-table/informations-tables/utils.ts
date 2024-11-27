export const displayRoundedNumber = (num: number | undefined | null): string => {
  if (!num) {
    return '';
  }

  return `± ${num.toFixed(3)}`;
};
