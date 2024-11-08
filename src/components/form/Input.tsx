'use client';

import { useFormContext } from 'react-hook-form';

import type { InputProps } from '@/ui/input/input';
import Input from '@/ui/input/input';

const FormInput = ({ name, ...props }: { name: string } & InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message;

  return <Input {...props} {...register(name, { valueAsNumber: props.type === 'number' })} error={error as string} />;
};

export { FormInput };
