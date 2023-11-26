import { FormEvent, useState, useId } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

interface Props {
  onSearch: (query: string) => void;
  initialValue?: string;
  className?: string;
}

const SearchForm = ({ onSearch, initialValue, className }: Props) => {
  const [inputValue, setInputValue] = useState(initialValue ?? '');
  const searchInputId = useId();

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form className={cn(className)} onSubmit={handleSubmit} role="search">
      <label className="sr-only" htmlFor={searchInputId}>
        Search music
      </label>
      <Input
        className="mb-3"
        name="search"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search"
        id={searchInputId}
      />
      <Button>Search</Button>
    </form>
  );
};

export default SearchForm;
