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
};

export function ToggleButtons({
  title,
  name,
  items,
  active,
  setActive,
  dataPdfIgnore,
}: ToggleButtonsProps) {
  return (
    <div className={styles.root} data-pdf-ignore={dataPdfIgnore}>
      {title && (
        <h4 className={`govuk-heading-s govuk-!-margin-bottom-1 govuk-!-margin-right-4 ${styles.heading}`}>
          {title}
        </h4>
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
    </div>
  );
}

export default ToggleButtons;
