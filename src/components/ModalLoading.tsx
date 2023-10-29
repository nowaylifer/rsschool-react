import { Component } from 'react';
import Spinner from './Spinner';

interface Props {
  delay?: number;
}

interface State {
  showing: boolean;
}

export class ModalLoading extends Component<Props, State> {
  state: State = {
    showing: false,
  };

  private defaultDelay = 25;

  private timerId?: number;

  componentDidMount() {
    this.timerId = setTimeout(
      () => this.setState({ showing: true }),
      this.props.delay ?? this.defaultDelay
    );
  }

  componentWillUnmount(): void {
    clearTimeout(this.timerId);
  }

  render() {
    if (!this.state.showing) return null;

    return (
      <div className="fixed inset-0 z-50 flex animate-fadeIn items-center justify-center bg-[rgba(0,0,0,0.5)] transition-opacity">
        <Spinner />
      </div>
    );
  }
}

export default ModalLoading;
