import { Component, ErrorInfo, ReactNode, ComponentType } from 'react';

interface Props {
  children?: ReactNode;
  FallbackComponent: ComponentType<FallbackProps>;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export type FallbackProps = {
  error: Error | undefined;
  resetErrorBoundary: () => void;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined });
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <this.props.FallbackComponent
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
