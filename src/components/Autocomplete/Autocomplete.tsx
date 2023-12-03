import {
  useReducer,
  useCallback,
  FormEvent,
  useMemo,
  useRef,
  Reducer,
  ReactNode,
  FocusEvent,
  ComponentProps,
  useEffect,
} from 'react';
import TextField from '../TextField';
import AutocompleteDropdown, { Option } from './AutocompleteDropdown';
import { reducer, initializeState, State, Action, InitializerArg } from './Autocomplete.reducer';
import { cn } from '@/utils';
import { FieldPath, UseFormRegister } from 'react-hook-form';
import { FormFields } from '@/types';

const DEFAULT_NOT_FOUND = 'No options';

type CommonProps<T> = {
  options: Option<T>[];
  defaultOption?: number; // index of options prop array
  showDropdownByDefault?: boolean;
  notFoundNode?: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof TextField>, 'name'>;

type HookProps<T, TFormFields extends FormFields> = {
  register: UseFormRegister<TFormFields>;
  name: FieldPath<TFormFields>;
} & CommonProps<T>;

type BasicProps<T> = {
  register?: never;
  name?: string;
} & CommonProps<T>;

type Props<T, TFormFields extends FormFields> = HookProps<T, TFormFields> | BasicProps<T>;

const Autocomplete = <T, TFormFields extends FormFields>({
  options,
  defaultOption,
  register,
  showDropdownByDefault = false,
  notFoundNode = DEFAULT_NOT_FOUND,
  className,
  name,
  value,
  ...delegated
}: Props<T, TFormFields>) => {
  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>, InitializerArg<T>>(
    reducer,
    {
      inputValue: (value as string) ?? '',
      showDropdown: showDropdownByDefault,
      selectedOption: defaultOption ? options[defaultOption] : null,
    },
    initializeState
  );

  const registerData = register?.(name);
  const { onBlur, onChange, ref, ...rest } = registerData ?? {};

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
      onBlur?.(e);
      dispatch({ type: 'BLUR' });
    }
  }, []);

  useEffect(() => {
    onChange?.({ type: 'input', target: inputRef.current });
  }, [state.inputValue]);

  const handleOptionSelect = useCallback((option: Option<T>) => {
    dispatch({ type: 'SELECT_OPTION', payload: option });
  }, []);

  return (
    <div className={cn('relative', className)}>
      <TextField
        value={state.inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        ref={(input) => {
          ref?.(input);
          inputRef.current = input;
        }}
        autoComplete="nope"
        onBlur={handleBlur}
        {...delegated}
        {...rest}
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
