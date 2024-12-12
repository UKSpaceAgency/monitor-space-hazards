import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const FORMAT_DATE = 'DD/MM/YYYY';

const FORMAT_DATE_TIME = 'DD/MM/YYYY HH:mm:ss';

const FORMAT_FULL_DATE = 'dddd DD MMMM YYYY';

export { dayjs, FORMAT_DATE, FORMAT_DATE_TIME, FORMAT_FULL_DATE };
