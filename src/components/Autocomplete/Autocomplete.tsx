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

const DEFAULT_NOT_FOUND = 'No options';

type Props<T, V = Option<T>[]> = {
  options: V;
  defaultOption?: keyof V & number; // index of options prop array
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
    if (e.relatedTarget == null || (e.relatedTarget !== dropDownRef.current && e.relatedTarget !== inputRef.current)) {
      dispatch({ type: 'BLUR' });
    }
  }, []);

  const handleOptionSelect = useCallback((option: Option<T>) => {
    dispatch({ type: 'SELECT_OPTION', payload: option });
    onChange?.(option);
  }, []);

  return (
    <div className="relative" onBlur={handleBlur}>
      <TextField
        value={state.inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        ref={inputRef}
        autoComplete="nope"
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
