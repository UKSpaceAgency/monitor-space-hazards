import type { TypeActivityReasonForFlag, TypeRisk } from '@/__generated__/data-contracts';
import type { TagColor } from '@/ui/tag/tag';
import Tag from '@/ui/tag/tag';

export const riskClasses: Record<string, TagColor> = {
  'Very low': 'grey',
  'Low': 'green',
  'Medium': 'yellow',
  'High': 'red',
  'Pending': 'blue',
  'None': 'grey',
  'No': 'grey',
};

type TypeRiskTag = TypeRisk | 'No' | 'None' | 'Pending' | null | undefined;

export const renderRiskTag = (risk: TypeRiskTag) => risk
  ? (
      <Tag color={riskClasses[risk as unknown as keyof typeof riskClasses]}>
        {risk}
      </Tag>
    )
  : '-';

const reasonForFlagClasses: Record<string, TagColor> = {
  'Unexpected position change': 'blue',
  'Manoeuvre not as planned': 'purple',
  'Manoeuvre as planned': 'grey',
  'Missing data': 'teal',
};

export const renderReasonForFlagTag = (reason: TypeActivityReasonForFlag | null | undefined) => {
  const reasonValue = reason ?? 'Missing data';
  return (
    <Tag color={reasonForFlagClasses[reasonValue as unknown as keyof typeof reasonForFlagClasses]}>
      {reasonValue}
    </Tag>
  );
};
