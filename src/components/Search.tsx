import { Component, ComponentProps, FormEvent } from 'react';
import Input from './Input';
import Button from './Button';
import { cn } from '../utils';

interface SearchProps extends ComponentProps<'div'> {
  onSearch: (query: string) => void;
}

interface SearchState {
  query: string;
}

class Search extends Component<SearchProps, SearchState> {
  state = {
    query: '',
  };

  handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    const { className } = this.props;
    return (
      <form className={cn(className)} onSubmit={this.handleSubmit}>
        <Input className="mb-3" value={this.state.query} onChange={this.handleChange} />
        <Button>Search</Button>
      </form>
    );
  }
}

export default Search;
