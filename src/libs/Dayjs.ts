import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const FORMAT_DATE = 'DD/MM/YYYY';

const FORMAT_DATE_TIME = 'DD/MM/YYYY HH:mm:ss';

export { dayjs, FORMAT_DATE, FORMAT_DATE_TIME };
