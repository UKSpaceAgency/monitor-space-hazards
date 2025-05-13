import type { TypeReentryRisk } from '@/__generated__/data-contracts';
import Tag from '@/ui/tag/tag';

const classes = {
  Low: 'govuk-tag--green',
  Medium: 'govuk-tag--yellow',
  High: 'govuk-tag--red',
};

export const renderRiskTag = (risk: TypeReentryRisk | null | undefined) => risk
  ? (
      <Tag className={classes[risk as unknown as keyof typeof classes]}>
        {risk}
      </Tag>
    )
  : '-';
