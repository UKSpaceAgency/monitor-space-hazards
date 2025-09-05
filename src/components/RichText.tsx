import type { ReactNode } from 'react';

// These tags are available
type Tag = 'p' | 'bold' | 'i' | 'h3' | 'h4' | 'list' | 'item' | 'special';

type Props = {
  children: (tags: Record<Tag, (chunks: ReactNode) => ReactNode>) => ReactNode;
};

export default function RichText({ children }: Props) {
  return (
    <div className="prose">
      {children({
        h4: (chunks: ReactNode) => <h4 className="govuk-heading-s">{chunks}</h4>,
        h3: (chunks: ReactNode) => <h3 className="govuk-heading-m">{chunks}</h3>,
        p: (chunks: ReactNode) => <p className="govuk-body">{chunks}</p>,
        bold: (chunks: ReactNode) => <b>{chunks}</b>,
        i: (chunks: ReactNode) => <i>{chunks}</i>,
        list: (chunks: ReactNode) => <ul className="govuk-list govuk-list--bullet">{chunks}</ul>,
        item: (chunks: ReactNode) => <li>{chunks}</li>,
        special: (chunks: ReactNode) => <strong className="govuk-tag">{chunks}</strong>,
      })}
    </div>
  );
}
