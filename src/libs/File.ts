import { Parser } from '@json2csv/plainjs';

export const createCSV = (data: Record<string, any>): Blob => {
  const json2csvParser = new Parser();
  const csv = json2csvParser.parse(data);
  const blob = new Blob([csv], {
    type: 'text/csv; charset=utf-8 ',
  });
  return blob;
};

export const createJSON = (data: Record<string, any>): Blob => {
  const blob = new Blob([JSON.stringify(data)], {
    type: 'text/json; charset=utf-8 ',
  });
  return blob;
};
