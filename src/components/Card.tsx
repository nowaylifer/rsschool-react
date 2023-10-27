import { Component, ComponentProps, ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils';
import Img from './Img';

class CardImage extends Component<ComponentPropsWithoutRef<typeof Img>> {
  render() {
    return (
      <div className="relative overflow-hidden rounded-xl bg-white bg-clip-border shadow-lg">
        <Img {...this.props} />
      </div>
    );
  }
}

class CardBody extends Component<ComponentProps<'div'>> {
  render() {
    const { className, children, ...props } = this.props;
    return (
      <div className={cn('text-center', className)} {...props}>
        {children}
      </div>
    );
  }
}

interface CardTitleProps extends ComponentProps<'h4'> {
  children: string;
}

class CardTitle extends Component<CardTitleProps> {
  render() {
    const { className, children, ...props } = this.props;
    return (
      <h4
        className={cn(
          'mb-2 text-lg font-semibold leading-snug tracking-normal text-gray-900 antialiased',
          className
        )}
        {...props}
      >
        {children}
      </h4>
    );
  }
}

interface CardDescProps extends ComponentProps<'p'> {
  children: string;
  variant?: 'accented' | 'normal';
}

class CardDesc extends Component<CardDescProps> {
  render() {
    const { className, children, variant = 'normal', ...props } = this.props;
    const color = variant === 'accented' ? 'text-pink-500' : 'text-gray-500';

    return (
      <p className={cn('leading-relax font-medium antialiased', color, className)} {...props}>
        {children}
      </p>
    );
  }
}

class Card extends Component<ComponentProps<'div'>> {
  static Image = CardImage;
  static Body = CardBody;
  static Title = CardTitle;
  static Description = CardDesc;

  render() {
    const { className, children, ...props } = this.props;
    return (
      <div
        className={cn(
          'relative flex cursor-pointer flex-col items-center gap-8 rounded-xl bg-white bg-clip-border px-6 py-6 text-gray-700 shadow transition-shadow hover:shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
}

export default Card;
