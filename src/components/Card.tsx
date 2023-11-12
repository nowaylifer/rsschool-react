import { ComponentProps, ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '../utils';
import Image from './Image';

const CardImage = ({ className, ...rest }: ComponentPropsWithoutRef<typeof Image>) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-xl bg-white bg-clip-border shadow-lg',
      className
    )}
  >
    <Image {...rest} />
  </div>
);

const CardBody = ({ className, ...rest }: ComponentProps<'div'>) => {
  return <div className={cn('text-center', className)} {...rest}></div>;
};

interface CardTitleProps extends ComponentProps<'h4'> {
  children: string;
}

export const CardTitle = ({ className, ...rest }: CardTitleProps) => (
  <h4
    className={cn(
      'mb-2 text-lg font-semibold leading-snug tracking-normal text-gray-900 antialiased',
      className
    )}
    {...rest}
  ></h4>
);

interface CardDescriptionProps extends ComponentProps<'p'> {
  children: ReactNode;
  variant?: 'accented' | 'normal';
}

export const CardDescription = ({
  variant = 'normal',
  className,
  ...rest
}: CardDescriptionProps) => {
  const color = variant === 'accented' ? 'text-pink-500' : 'text-gray-500';
  return (
    <p className={cn('leading-relax font-medium antialiased', color, className)} {...rest}></p>
  );
};

const Card = ({ className, ...rest }: ComponentProps<'div'>) => (
  <div
    className={cn(
      'relative flex flex-col items-center gap-8 rounded-xl bg-white bg-clip-border px-6 py-6 text-gray-700 shadow transition-shadow hover:shadow-lg',
      className
    )}
    {...rest}
  ></div>
);

Card.Image = CardImage;
Card.Body = CardBody;
Card.Title = CardTitle;
Card.Description = CardDescription;

export default Card;
