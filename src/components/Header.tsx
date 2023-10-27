import { Component, ComponentProps } from 'react';
import { cn } from '../utils';

export class Header extends Component<ComponentProps<'header'>> {
  render() {
    const { className } = this.props;
    return (
      <header className="my-10">
        <h1 className={cn('text-3xl font-bold text-slate-400', className)}>Music Searcher</h1>
      </header>
    );
  }
}

export default Header;
