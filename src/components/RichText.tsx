import type { ReactNode } from 'react';

// These tags are available
type Tag = 'p' | 'b' | 'i' | 'special';

type Props = {
  children: (tags: Record<Tag, (chunks: ReactNode) => ReactNode>) => ReactNode;
};

export default function RichText({ children }: Props) {
  return (
    <div className="prose">
      {children({
        p: (chunks: ReactNode) => <p className="govuk-body">{chunks}</p>,
        b: (chunks: ReactNode) => <b>{chunks}</b>,
        i: (chunks: ReactNode) => <i>{chunks}</i>,
        special: (chunks: ReactNode) => <strong className="govuk-tag">{chunks}</strong>,
      })}
    </div>
  );
}
