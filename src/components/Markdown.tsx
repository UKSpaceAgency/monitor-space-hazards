import ReactMarkdown from 'react-markdown';

const Markdown = ({ children }: { children?: string | null }) => {
  if (children == null || children === '') {
    return null;
  }

  return (
    <ReactMarkdown components={{
      p: props => <p className="govuk-body whitespace-pre-wrap" {...props} />,
    }}
    >
      {children}
    </ReactMarkdown>
  );
};

export { Markdown };
