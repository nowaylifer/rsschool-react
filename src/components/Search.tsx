import { Component } from 'react';
import { FormEvent } from 'react';

type SearchProps = {
  onSearch: (query: string) => void;
};

type State = {
  query: string;
};

class Search extends Component<SearchProps, State> {
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
    return (
      <form onSubmit={this.handleSubmit}>
        <input value={this.state.query} onChange={this.handleChange} />
        <button>Search</button>
      </form>
    );
  }
}

export default Search;
