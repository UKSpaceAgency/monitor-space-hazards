import clsx from 'clsx';
import type { HTMLProps } from 'react';

export const TableCaption = ({ className, ...props }: HTMLProps<HTMLTableCaptionElement>) => <caption className={clsx('govuk-table__caption govuk-table__caption--s', className)} {...props} />;

export const Table = ({ className, ...props }: HTMLProps<HTMLTableElement>) => <table className={clsx('govuk-table', className)} {...props} />;

export const TableHead = ({ className, ...props }: HTMLProps<HTMLTableSectionElement>) => <thead className={clsx('govuk-table__head', className)} {...props} />;

export const TableBody = ({ className, ...props }: HTMLProps<HTMLTableSectionElement>) => <tbody className={clsx('govuk-table__body', className)} {...props} />;

export const TableRow = ({ className, ...props }: HTMLProps<HTMLTableRowElement>) => <tr className={clsx('govuk-table__row', className)} {...props} />;

export const TableCellHeader = ({ className, ...props }: HTMLProps<HTMLTableCellElement>) => <th className={clsx('govuk-table__header', className)} {...props} />;

export const TableCell = ({ className, ...props }: HTMLProps<HTMLTableCellElement>) => <td className={clsx('govuk-table__cell', className)} {...props} />;
