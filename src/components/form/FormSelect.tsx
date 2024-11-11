import { useFormContext } from 'react-hook-form';

import type { SelectProps } from '@/ui/select/select';
import Select from '@/ui/select/select';

export function FormSelect({
  name,
  ...props
}: { name: string } & SelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;

  return (
    <Select
      {...props}
      {...register(name)}
      error={error}
    />
  );
}

export default FormSelect;
