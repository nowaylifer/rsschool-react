import { Component, ComponentProps } from 'react';
import { cn } from '../utils';

export class Button extends Component<ComponentProps<'button'>> {
  render() {
    const { className, children, ...props } = this.props;
    return (
      <button
        className={cn(
          'rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
}

export default Button;
