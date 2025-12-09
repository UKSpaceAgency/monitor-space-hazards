import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const FORMAT_SHORT_DATE = 'DD/MM/YY';

const FORMAT_DATE = 'DD/MM/YYYY';

const FORMAT_DATE_TIME = 'DD/MM/YYYY HH:mm:ss';

const FORMAT_FULL_DATE = 'dddd DD MMMM YYYY';

const FORMAT_FULL_DATE_TIME = 'dddd DD MMMM YYYY [at] HH:mm:ss UTC';

const FORMAT_FULL_DATE_TIME_WITH_UTC = 'dddd DD MMMM YYYY [at] HH:mm:ss UTC*';

const FORMAT_API_DATE_TIME = 'YYYY-MM-DDTHH:mm:ss';

const FORMAT_API_DATE = 'YYYY-MM-DD';

const TODAY_DATE_TIME = dayjs().hour(12).minute(0).second(0);

const FORMAT_DATE_FULL_MONTH = 'DD MMMM YYYY';

const FORMAT_TIME = 'HH:mm:ss';

const eachDayOfInterval = ({
  start,
  end,
}: {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;
}) => {
  // Throw an exception if start date is after end date or if any date is `Invalid Date`
  if (start.isAfter(end, 'day')) {
    throw new RangeError('Invalid interval');
  }

  const dates = [];

  let currentDate = start.clone();

  const step = 1;

  while (currentDate.isBefore(end)) {
    dates.push(currentDate.clone().format('YYYY-MM-DD'));
    currentDate = currentDate.add(step, 'day');
  }

  return dates;
};

export { dayjs, eachDayOfInterval, FORMAT_API_DATE, FORMAT_API_DATE_TIME, FORMAT_DATE, FORMAT_DATE_FULL_MONTH, FORMAT_DATE_TIME, FORMAT_FULL_DATE, FORMAT_FULL_DATE_TIME, FORMAT_FULL_DATE_TIME_WITH_UTC, FORMAT_SHORT_DATE, FORMAT_TIME, TODAY_DATE_TIME };
