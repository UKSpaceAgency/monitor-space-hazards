import { isArray, snakeCase } from 'lodash';
import Link from 'next/link';
import ReactHtmlMap from 'react-html-map';

const HtmlMapper = ({ content }: { content: string }) => {
  return (
    <ReactHtmlMap html={content} decodeEntities>
      {{
        p: props => <p className="govuk-body" {...props} />,
        strong: null,

        a: ({ href, ...props }) => <Link className="govuk-link" href={href as string} {...props} />,
        h1: null,
        h2: props => (
          // eslint-disable-next-line jsx-a11y/heading-has-content
          <h2
            data-anchor={
              isArray(props.children)
                ? snakeCase(props.children[0].props.children || '')
                : ''
            }
            className="govuk-heading-l"
            {...props}
          />
        ),
        // eslint-disable-next-line jsx-a11y/heading-has-content
        h3: props => <h3 className="govuk-heading-m" {...props} />,
        // eslint-disable-next-line jsx-a11y/heading-has-content
        h4: props => <h4 className="govuk-heading-s" {...props} />,
        // eslint-disable-next-line jsx-a11y/heading-has-content
        h5: props => <h5 className="govuk-heading-s" {...props} />,
        thead: props => <thead className="govuk-table__head" {...props} />,
        tbody: props => <tbody className="govuk-table__body" {...props} />,
        // eslint-disable-next-line react/no-children-prop
        table: props => <table className="govuk-table" children={props.children} />,
        tr: props => <tr className="govuk-table__row" {...props} />,
        th: ({ style, ...props }) => <th className="govuk-table__header" {...props} />,
        td: ({ style, ...props }) => <td className="govuk-table__cell" {...props} />,
        ul: props => <ul className="govuk-list govuk-list--bullet" {...props} />,
        ol: props => <ol className="govuk-list" {...props} />,
        li: null,
        button: props => <button type="button" className="govuk-button" {...props} />,
        br: () => <br />,
      }}
    </ReactHtmlMap>
  );
};

export { HtmlMapper };
