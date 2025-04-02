export const rounded = (value: number, decimalPlaces: number = 3) => {
  return value.toLocaleString('en-US', {
    maximumFractionDigits: decimalPlaces,
    minimumFractionDigits: 0,
  });
};

export const roundedPercent = (value: number, decimalPlaces: number = 3) => {
  return `${(value * 100).toFixed(decimalPlaces)}%`;
};

export const getAbsoluteValue = (num: number | undefined | null) => {
  if (!num && num !== 0) {
    return;
  }

  return Math.abs(num);
};

export const calcDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180)
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

export const displayExponential = (num: number | undefined | null, fractionDigits: number) => {
  if (!num && num !== 0) {
    return;
  }

  return num ? num.toExponential(fractionDigits) : 0;
};
