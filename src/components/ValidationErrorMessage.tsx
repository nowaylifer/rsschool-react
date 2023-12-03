import { cn } from '@/utils';
import ExclamationIcon from '@/assets/icons/exclamation-circle.svg?react';

type Props = {
  message: string | undefined;
  className?: string;
};

const ValidationErrorMessage = ({ message, className }: Props) => {
  return (
    <p className={cn('mt-1 flex items-center gap-x-1 text-sm font-semibold text-red-500', className)}>
      {message && <ExclamationIcon className="shrink-0" />}
      {message}
    </p>
  );
};

export default ValidationErrorMessage;
