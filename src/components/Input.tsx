import { Component, ComponentProps } from 'react';
import { cn } from '../utils';

export class Input extends Component<ComponentProps<'input'>> {
  render() {
    const { className, ...props } = this.props;
    return (
      <input
        className={cn(
          'w-full appearance-none rounded-md border px-3 py-2 font-medium leading-tight text-gray-700 shadow focus:outline-none focus:ring',
          className
        )}
        {...props}
      />
    );
  }
}

export default Input;
