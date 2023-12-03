import { Option } from './AutocompleteDropdown';

export type State<T> = {
  showDropdown: boolean;
  selectedOption: Option<T> | null;
  inputValue: string;
  isDirty: boolean;
  disabled?: boolean;
};

export type Action<T> =
  | { type: 'SELECT_OPTION'; payload: Option<T> }
  | { type: 'INPUT'; payload: string }
  | { type: 'BLUR' }
  | { type: 'FOCUS' };

export type InitializerArg<T> = Omit<State<T>, 'isDirty'>;

export const initializeState = <T>({
  showDropdown,
  selectedOption,
  inputValue,
  disabled = false,
}: InitializerArg<T>): State<T> => {
  return {
    showDropdown,
    selectedOption,
    inputValue: selectedOption ? selectedOption.label : inputValue,
    isDirty: false,
    disabled: disabled,
  };
};

export const reducer = <T>(state: State<T>, action: Action<T>) => {
  switch (action.type) {
    case 'SELECT_OPTION': {
      return {
        ...state,
        selectedOption: action.payload,
        showDropdown: false,
        inputValue: action.payload.label,
        isDirty: false,
      };
    }

    case 'INPUT': {
      return { ...state, inputValue: action.payload, isDirty: true };
    }

    case 'BLUR': {
      return { ...state, inputValue: state.selectedOption?.label ?? '', showDropdown: false, isDirty: false };
    }

    case 'FOCUS': {
      return { ...state, showDropdown: true };
    }
  }
};
