import { FormEvent, useState } from 'react';
import Input from './Input';
import Button from './Button';
import { cn } from '../utils';

interface Props {
  onSearch: (query: string) => void;
  className?: string;
}

const SearchForm = ({ onSearch, className }: Props) => {
  // const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setQuery(inputValue);
    onSearch(inputValue);
  };

  return (
    <form className={cn(className)} onSubmit={handleSubmit}>
      <Input className="mb-3" value={inputValue} onChange={handleChange} />
      <Button>Search</Button>
    </form>
  );
};

export default SearchForm;
