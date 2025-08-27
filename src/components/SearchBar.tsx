'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useState } from 'react';

import Button from '@/ui/button/button';
import Input from '@/ui/input/input';
import Label from '@/ui/label/label';

type SearchBarProps = {
  label: string;
  placeholder: string;
  paramName?: string;
  ariaLabel?: string;
};

const SearchBar = ({ label, placeholder, paramName, ariaLabel }: SearchBarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState(searchParams.get('search_like')?.toString() || '');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const param = paramName || 'search_like';
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set(param, search);
    } else {
      params.delete(param);
    }
    replace(`${pathname}?${params.toString()}`);
    e.preventDefault();
  };

  return (
    <div>
      <Label className="font-bold" htmlFor="search-input">{label}</Label>
      <form className="flex gap-3" onSubmit={handleSubmit}>
        <Input className="flex-1" id="search-input" placeholder={placeholder} value={search} onChange={e => setSearch(e.target.value)} aria-label={ariaLabel} />
        <div>
          <Button type="submit">Search</Button>
        </div>
      </form>
    </div>

  );
};

export { SearchBar };
