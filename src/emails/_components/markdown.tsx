import type { MarkdownProps } from '@react-email/components';
import { Markdown as MarkdownEmail } from '@react-email/components';

export const Markdown = (props: MarkdownProps) => {
  return (
    <MarkdownEmail
      markdownCustomStyles={{
        p: {
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          marginTop: '0',
        },
      }}
      {...props}
    />
  );
};
