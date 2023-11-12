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
        'border-blue-gray-100 cursor-pointer rounded-full border bg-white px-2 py-2 text-sm font-semibold transition focus:outline-none focus:ring [&:not(:focus)]:hover:bg-gray-100',
        className
      )}
      onChange={handleChange}
      value={currentSize}
      aria-label="Select page size"
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
