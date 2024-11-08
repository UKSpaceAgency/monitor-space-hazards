type ErrorTemplateProps = {
  children: React.ReactNode;
};

const ErrorTemplate = ({
  children,
}: ErrorTemplateProps) => {
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper" id="main-content">
        {children}
      </main>
    </div>
  );
};

export { ErrorTemplate };
