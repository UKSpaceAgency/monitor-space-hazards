import type { TypeActivityReasonForFlag } from '@/__generated__/data-contracts';
import Tag from '@/ui/tag/tag';

export const riskClasses = {
  'Low': 'govuk-tag--green',
  'Very low': 'govuk-tag--green',
  'Medium': 'govuk-tag--yellow',
  'High': 'govuk-tag--red',
  'Pending': 'govuk-tag--blue',
  'None': 'govuk-tag--grey',
};

export const renderRiskTag = (risk: typeof riskClasses[keyof typeof riskClasses] | null | undefined | 'None') => risk
  ? (
      <Tag className={riskClasses[risk as unknown as keyof typeof riskClasses]}>
        {risk}
      </Tag>
    )
  : '-';

const reasonForFlagClasses = {
  'Unexpected position change': 'govuk-tag--blue',
  'Manoeuvre not as planned': 'govuk-tag--purple',
  'Manoeuvre as planned': 'govuk-tag--grey',
  'Missing data': 'govuk-tag--teal',
};

export const renderReasonForFlagTag = (reason: TypeActivityReasonForFlag | null | undefined) => {
  const reasonValue = reason ?? 'Missing data';
  return (
    <Tag className={reasonForFlagClasses[reasonValue as unknown as keyof typeof reasonForFlagClasses]}>
      {reasonValue}
    </Tag>
  );
};
