export function roundToDecimalPlaces(num: number, decimalPlaces: number) {
  const formatted = num.toFixed(decimalPlaces);

  return formatted.replace(/\.?0+$/, '');
}
