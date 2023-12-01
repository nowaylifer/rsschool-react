import { createSlice } from '@reduxjs/toolkit';
import countryJSON from '@/assets/countries.json';
import CountryItem from '@/components/CountryItem';
import { Option } from '@/components/Autocomplete/AutocompleteDropdown';
import { RootState } from './store';

const countryOptions = countryJSON.map<Option<string>>(({ name, code }) => ({
  label: name,
  value: code,
  element: <CountryItem label={`${name} (${code})`} code={code} />,
}));

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const initialState = {
  countryOptions,
  genderOptions,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {},
});

// export const {} = formSlice.actions;
export const selectCountryOptions = (state: RootState) => state.form.countryOptions;
export const selectGenderOptions = (state: RootState) => state.form.genderOptions;

export default formSlice;
