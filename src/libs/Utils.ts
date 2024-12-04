export function roundToDecimalPlaces(num: number, decimalPlaces: number) {
  let formatted = num.toFixed(decimalPlaces);

  formatted = formatted.replace(/\.?0+$/, '');

  return formatted;
}
