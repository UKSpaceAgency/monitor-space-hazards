'use client';

import { useFormContext } from 'react-hook-form';

import type { CheckboxesProps } from '@/ui/checkboxes/checkboxes';
import Checkboxes from '@/ui/checkboxes/checkboxes';

const FormCheckboxes = ({ name, items, ...props }: { name: string } & CheckboxesProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;

  return (
    <Checkboxes
      {...props}
      items={items.map(item => ({
        ...item,
        ...register(name),
      }))}
      error={error}
    />
  );
};

export { FormCheckboxes };
