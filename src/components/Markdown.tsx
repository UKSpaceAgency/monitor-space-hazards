import ReactMarkdown from 'react-markdown';

const Markdown = ({ children }: { children?: string | null }) => {
  return (
    <ReactMarkdown components={{
      p: props => <p className="govuk-body" {...props} />,
    }}
    >
      {children}
    </ReactMarkdown>
  );
};

export { Markdown };
