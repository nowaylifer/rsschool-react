import { ChangeEventHandler, memo } from 'react';
import { cn } from '../../utils';

interface Props {
  onChange(newSize: number): void;
  currentSize: number;
  sizes: number[];
  className?: string;
}

const PageSizeSelect = ({ currentSize, onChange, sizes, className }: Props) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(Number(e.target.value));
  };

  return (
    <select
      className={cn(
        'border-blue-gray-100 cursor-pointer rounded-full border bg-white px-2 py-2 text-sm font-semibold transition hover:bg-gray-100 focus:outline-none focus:ring',
        className
      )}
      onChange={handleChange}
      value={currentSize}
    >
      {sizes.map((size) => (
        <option key={size} value={size}>
          {`${size} / page`}
        </option>
      ))}
    </select>
  );
};
export default memo(PageSizeSelect);
