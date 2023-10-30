import { Component, PropsWithChildren } from 'react';
import Button from './Button';

interface State {
  isError: boolean;
}

export class ThrowError extends Component<PropsWithChildren, State> {
  state = {
    isError: false,
  };

  render() {
    if (this.state.isError) throw new Error('Test Error');
    return (
      <Button
        className="bg-red-500 hover:bg-red-600"
        onClick={() => this.setState({ isError: true })}
      >
        Throw error
      </Button>
    );
  }
}

export default ThrowError;
