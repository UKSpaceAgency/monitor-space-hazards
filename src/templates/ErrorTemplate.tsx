import Footer from './components/Footer';
import Header from './components/Header';

type ErrorTemplateProps = {
  children: React.ReactNode;
};

const ErrorTemplate = ({
  children,
}: ErrorTemplateProps) => {
  return (
    <>
      <Header />
      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export { ErrorTemplate };
