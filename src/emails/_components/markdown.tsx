import type { MarkdownProps } from '@react-email/components';
import { Markdown as MarkdownEmail } from '@react-email/components';

export const Markdown = (props: MarkdownProps) => {
  return (
    <MarkdownEmail
      markdownCustomStyles={{
        p: {
          fontSize: '14px',
          lineHeight: '20px',
          marginTop: '0',
          marginBottom: '16px',
        },
      }}
      {...props}
    />
  );
};
