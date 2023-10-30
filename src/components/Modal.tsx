import { Component, PropsWithChildren, ReactNode } from 'react';
import Spinner from './Spinner';

class Backdrop extends Component<PropsWithChildren> {
  render() {
    return (
      <div className="fixed inset-0 z-50 flex animate-fadeIn items-center justify-center bg-[rgba(0,0,0,0.5)] transition-opacity">
        {this.props.children}
      </div>
    );
  }
}

class Body extends Component<PropsWithChildren> {
  render() {
    return <div className="rounded-md bg-white px-16 py-14 text-center">{this.props.children}</div>;
  }
}

interface ModalProps {
  delay?: number;
  children: ReactNode;
}

interface ModalState {
  showing: boolean;
}

export class Modal extends Component<ModalProps, ModalState> {
  static Backdrop = Backdrop;
  static Body = Body;
  static Spinner = Spinner;

  state: ModalState = {
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

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  render() {
    if (!this.state.showing) return null;

    return this.props.children;
  }
}

export default Modal;
