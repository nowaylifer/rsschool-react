import { FormEvent, useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { cn } from '../../utils';

interface Props {
  onSearch: (query: string) => void;
  initialValue?: string;
  className?: string;
}

const SearchForm = ({ onSearch, initialValue, className }: Props) => {
  const [inputValue, setInputValue] = useState(initialValue ?? '');

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form className={cn(className)} onSubmit={handleSubmit}>
      <Input
        className="mb-3"
        name="search"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search"
      />
      <Button>Search</Button>
    </form>
  );
};

export default SearchForm;
