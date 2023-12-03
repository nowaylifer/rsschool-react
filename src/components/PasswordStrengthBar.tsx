import { cn } from '@/utils';
import { PasswordStrength } from '@/types';

type Props = {
  strength: PasswordStrength;
  className?: string;
};

const colorMap: Record<PasswordStrength | 'default', string> = {
  default: 'bg-gray-300',
  weak: 'bg-red-500',
  okay: 'bg-yellow-500',
  strong: 'bg-green-500',
};

const getBarColor = (strength: PasswordStrength, index: number) => {
  return Object.values(PasswordStrength).indexOf(strength) >= index ? colorMap[strength] : colorMap.default;
};

const PasswordStrengthBar = ({ strength, className }: Props) => {
  return (
    <div className={cn('flex gap-x-3', className)}>
      {Array.from({ length: 3 }, (_, index) => {
        return <div key={index} className={cn('h-[3px] w-1/3 rounded', getBarColor(strength, index))}></div>;
      })}
    </div>
  );
};

export default PasswordStrengthBar;
