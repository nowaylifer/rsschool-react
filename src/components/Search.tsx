import { Component, ComponentProps, FormEvent } from 'react';
import Input from './Input';
import Button from './Button';
import withPersistance from './withPersistance';
import { cn } from '../utils';

interface Props extends ComponentProps<'div'> {
  onSearch: (query: string) => void;
}

interface State {
  query: string;
  inputValue: string;
}

class Search extends Component<Props, State> {
  state: State = {
    query: '',
    inputValue: '',
  };

  private isFirstRender = true;

  componentDidMount() {
    this.isFirstRender = false;
  }

  private handleChange = (e: FormEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.currentTarget.value });
  };

  private handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { inputValue } = this.state;
    this.setState({ query: inputValue });
    this.props.onSearch(inputValue);
  };

  render() {
    const { className } = this.props;
    const { inputValue, query } = this.state;

    return (
      <form className={cn(className)} onSubmit={this.handleSubmit}>
        <Input
          className="mb-3"
          value={this.isFirstRender ? query : inputValue}
          onChange={this.handleChange}
        />
        <Button>Search</Button>
      </form>
    );
  }
}

export default withPersistance(Search, ['query']);
