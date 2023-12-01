import { cn } from '@/utils';
import { ForwardedRef, ReactNode, forwardRef, useEffect, useRef } from 'react';
import AutocompleteDropdownItem from './AutocompleteDropdownItem';

export type Option<T> = { element?: ReactNode; label: string; value: T };

type Props<T> = {
  options: Option<T>[];
  selectedOption: Option<T> | null;
  onOptionSelect: (option: Option<T>) => void;
  className?: string;
  notFoundNode?: ReactNode;
};

const AutocompleteDropdownInner = <T,>(
  { options, selectedOption, onOptionSelect, className, notFoundNode }: Props<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const selectedItemRef = useRef<HTMLLIElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: selectedItemRef.current?.offsetTop,
    });
  }, []);

  return (
    <div
      className={cn('flex max-h-60 w-full flex-col rounded-md border border-gray-300 bg-white', className)}
      tabIndex={-1}
      ref={ref}
    >
      <ul className="h-full overflow-y-auto" ref={listRef}>
        {options.length ? (
          options.map((option) => {
            const isSelected = option === selectedOption;

            return (
              <AutocompleteDropdownItem
                key={option.label}
                onClick={() => onOptionSelect(option)}
                isSelected={isSelected}
                ref={isSelected ? selectedItemRef : undefined}
              >
                {option.element ?? option.label}
              </AutocompleteDropdownItem>
            );
          })
        ) : (
          <AutocompleteDropdownItem>{notFoundNode}</AutocompleteDropdownItem>
        )}
      </ul>
    </div>
  );
};

const AutocompleteDropdown = forwardRef(AutocompleteDropdownInner) as <T>(
  props: Props<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof AutocompleteDropdownInner>;

export default AutocompleteDropdown;
