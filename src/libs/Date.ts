import { dayjs } from './Dayjs';

const isDate = (date: string) => Date.parse(date).toString() !== 'NaN';

export const formatDateTime = (dateString: string) => {
  const convertedDate = dayjs.utc(dateString);
  return dateString && isDate(dateString)
    ? convertedDate.format('DD/MM/YYYY HH:mm:ss')
    : 'Unknown';
};
