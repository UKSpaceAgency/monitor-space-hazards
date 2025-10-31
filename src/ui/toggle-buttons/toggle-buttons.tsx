import { type SetStateAction, useId } from 'react';

import Radios from '../radios/radios';

export type ToggleButtonsProps = {
  name: string;
  items: Array<{
    title: string;
    value: string | number;
    id: string;
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
  const prefix = useId();

  return (
    <Radios
      className="inline-flex items-center md:h-[44px] mb-0"
      small
      inline
      name={name}
      items={items.map(({ title, value, id }) => ({
        id: `${prefix}-${id}`,
        children: title,
        value,
        onChange: () => setActive(value),
        checked: active === value,
      }))}
      data-pdf-ignore={dataPdfIgnore}
    >
      {title && (
        <>
          <legend
            className="absolute opacity-0 pointer-events-none"
            aria-label={`${ariaLabel} ${title}`}
          >
            {title}
          </legend>
          <span className="govuk-body font-bold mb-0 mr-5">
            {title}
          </span>
        </>
      )}
    </Radios>
  );
}

export default ToggleButtons;
