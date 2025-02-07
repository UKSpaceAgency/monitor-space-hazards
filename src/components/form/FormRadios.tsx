import { useFormContext } from 'react-hook-form';

import type { RadiosProps } from '@/ui/radios/radios';
import Radios from '@/ui/radios/radios';

export function FormRadios({
  name,
  items,
  ...props
}: { name: string } & RadiosProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;

  return (
    <Radios
      {...props}
      items={items.map(item => ({
        ...item,
        ...register(name),
      }))}
      error={error}
    />
  );
}

export default FormRadios;
