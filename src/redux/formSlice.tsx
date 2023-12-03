import { createSlice } from '@reduxjs/toolkit';
import countryJSON from '@/assets/countries.json';
import CountryItem from '@/components/CountryItem';
import { Option } from '@/components/Autocomplete/AutocompleteDropdown';
import { RootState } from './store';
import { FormFields } from '@/types';
import { PayloadAction } from '@reduxjs/toolkit';

export type Form = {
  image?: unknown;
} & Omit<FormFields, 'image'>;

const countryOptions = countryJSON.map<Option<string>>(({ name, code }) => ({
  label: name,
  value: code,
  element: <CountryItem label={`${name} (${code})`} code={code} />,
}));

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

type SliceState = {
  countryOptions: Option<string>[];
  genderOptions: Option<string>[];
  submittedForms: Form[];
};

const initialState: SliceState = {
  countryOptions,
  genderOptions,
  submittedForms: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<Form>) {
      state.submittedForms.push(action.payload);
    },
  },
});

export const { addForm } = formSlice.actions;
export const selectCountryOptions = (state: RootState) => state.form.countryOptions;
export const selectGenderOptions = (state: RootState) => state.form.genderOptions;

export default formSlice;
