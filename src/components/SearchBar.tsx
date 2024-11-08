'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useState } from 'react';

import Button from '@/ui/button/button';
import Input from '@/ui/input/input';
import Label from '@/ui/label/label';

type SearchBarProps = {
  label: string;
  placeholder: string;
};

const SearchBar = ({ label, placeholder }: SearchBarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, setSearch] = useState(searchParams.get('search_like')?.toString());

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set('search_like', search);
    } else {
      params.delete('search_like');
    }
    replace(`${pathname}?${params.toString()}`);
    e.preventDefault();
  };

  return (
    <div>
      <Label className="font-bold" htmlFor="search-input">{label}</Label>
      <form className="flex gap-3" onSubmit={onSubmit}>
        <Input className="flex-1" id="search-input" placeholder={placeholder} value={search} onChange={e => setSearch(e.target.value)} />
        <div>
          <Button type="submit">Search</Button>
        </div>
      </form>
    </div>

  );
};

export { SearchBar };
