import { Option } from './AutocompleteDropdown';

export type State<T> = {
  showDropdown: boolean;
  selectedOption: Option<T> | null;
  inputValue: string;
  isDirty: boolean;
};

export type Action<T> =
  | { type: 'SELECT_OPTION'; payload: Option<T> }
  | { type: 'INPUT'; payload: string }
  | { type: 'BLUR' }
  | { type: 'FOCUS' };

export type InitializerArg<T> = Pick<State<T>, 'showDropdown' | 'selectedOption'>;

export const initializeState = <T>({ showDropdown, selectedOption }: InitializerArg<T>): State<T> => {
  return {
    showDropdown,
    selectedOption,
    inputValue: selectedOption ? selectedOption.label : '',
    isDirty: false,
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
