import {
  ComponentPropsWithoutRef,
  useReducer,
  useCallback,
  FormEvent,
  useMemo,
  useRef,
  Reducer,
  ReactNode,
  FocusEvent,
} from 'react';
import TextField from '../TextField';
import AutocompleteDropdown, { Option } from './AutocompleteDropdown';
import { reducer, initializeState, State, Action, InitializerArg } from './Autocomplete.reducer';
import { cn } from '@/utils';

const DEFAULT_NOT_FOUND = 'No options';

type Props<T> = {
  options: Option<T>[];
  defaultOption?: number; // index of options prop array
  showDropdownByDefault?: boolean;
  onChange?: (option: Option<T>) => void;
  notFoundNode?: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof TextField>, 'onBlur' | 'onChange' | 'onFocus' | 'value'>;

const Autocomplete = <T,>({
  options,
  defaultOption,
  onChange,
  showDropdownByDefault = false,
  notFoundNode = DEFAULT_NOT_FOUND,
  className,
  ...delegated
}: Props<T>) => {
  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>, InitializerArg<T>>(
    reducer,
    { showDropdown: showDropdownByDefault, selectedOption: defaultOption ? options[defaultOption] : null },
    initializeState
  );

  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const suggestedOptions = useMemo(
    () =>
      state.isDirty
        ? options.filter((option) => option.label.toLocaleLowerCase().startsWith(state.inputValue.toLocaleLowerCase()))
        : options,
    [state.inputValue, options, state.isDirty]
  );

  const handleInputChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    dispatch({ type: 'INPUT', payload: e.currentTarget.value });
  }, []);

  const handleFocus = useCallback(() => {
    dispatch({ type: 'FOCUS' });
  }, []);

  const handleBlur = useCallback((e: FocusEvent<HTMLElement>) => {
    const isBlurOutside =
      e.relatedTarget == null || (e.relatedTarget !== dropDownRef.current && e.relatedTarget !== inputRef.current);

    if (isBlurOutside) {
      dispatch({ type: 'BLUR' });
    }
  }, []);

  const handleOptionSelect = useCallback((option: Option<T>) => {
    dispatch({ type: 'SELECT_OPTION', payload: option });
    onChange?.(option);
  }, []);

  return (
    <div className={cn('relative', className)}>
      <TextField
        value={state.inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        ref={inputRef}
        autoComplete="nope"
        onBlur={handleBlur}
        {...delegated}
      />
      {state.showDropdown && (
        <AutocompleteDropdown
          options={suggestedOptions}
          selectedOption={state.selectedOption}
          onOptionSelect={handleOptionSelect}
          className="absolute left-0 top-full"
          notFoundNode={notFoundNode}
          ref={dropDownRef}
        />
      )}
    </div>
  );
};

export default Autocomplete;
