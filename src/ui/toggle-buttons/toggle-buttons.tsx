import type { SetStateAction } from 'react';

import Radios from '../radios/radios';
import styles from './toggle-buttons.module.scss';

export type ToggleButtonsProps = {
  name: string;
  items: Array<{
    title: string;
    value: string | number;
    ariaLabel?: string;
  }>;
  active: string | number;
  setActive: SetStateAction<any>;
  title?: string;
  dataPdfIgnore?: true;
  ariaLabel?: string;
};

export function ToggleButtons({
  title,
  name,
  items,
  active,
  setActive,
  dataPdfIgnore,
  ariaLabel,
}: ToggleButtonsProps) {
  return (
    <fieldset className={styles.root} data-pdf-ignore={dataPdfIgnore}>
      {title && (
        <div>
          <legend
            className={`govuk-fieldset__legend govuk-!-font-weight-bold govuk-!-margin-bottom-1 govuk-!-margin-right-4 ${styles.heading}`}
            aria-label={`${ariaLabel} ${title}`}
          >
            {title}
          </legend>
        </div>
      )}
      <Radios
        className={styles['button-group']}
        small
        inline
        name={name}
        items={items.map(({ title, value }) => ({
          children: title,
          value,
          onChange: () => setActive(value),
          checked: active === value,
        }))}
      />
    </fieldset>
  );
}

export default ToggleButtons;
