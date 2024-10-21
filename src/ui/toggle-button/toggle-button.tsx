import clsx from 'clsx';
import type { ReactNode, SetStateAction } from 'react';

export type ToggleButtonProps = {
  children: ReactNode;
  active: boolean;
  setActive: SetStateAction<any>;
};

export function ToggleButton({
  children,
  active,
  setActive,
}: ToggleButtonProps) {
  return (
    <div>
      <button
        type="button"
        className={clsx('inline-flex', 'px-2', 'py-1', 'border-blue', 'outline-none', 'text-blue', 'bg-lightGrey', 'font-bold', 'rounded-md', {
          'bg-blue': active,
          'text-lightGrey': active,
        })}
        onClick={() => setActive(!active)}
      >
        {children}
      </button>
    </div>
  );
}

export default ToggleButton;
