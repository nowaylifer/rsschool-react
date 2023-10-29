import { Component, ComponentProps } from 'react';
import { cn } from '../utils';
import ThrowError from './ThrowError';

export class Header extends Component<ComponentProps<'header'>> {
  render() {
    const { className } = this.props;
    return (
      <header className="my-10 flex gap-4">
        <h1 className={cn('text-3xl font-bold text-slate-400', className)}>Music Album Searcher</h1>
        <ThrowError />
      </header>
    );
  }
}

export default Header;
