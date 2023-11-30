import Box from '@/components/Box';
import TextField from '@/components/TextField';
import RadioButton from '@/components/RadioButton';
import Label from '@/components/Label';
import Autocomplete from '@/components/Autocomplete/Autocomplete';
import { Option } from '@/components/Autocomplete/AutocompleteDropdown';
import CountryItem from '@/components/CountryItem';
import countriesJSON from '@/assets/countries.json';

const countryOptions = countriesJSON.map<Option<string>>(({ name, code }) => ({
  label: name,
  value: code,
  element: <CountryItem label={`${name} (${code})`} code={code} />,
}));

const UncontrolledForm = () => {
  return (
    <Box>
      <form>
        <TextField label="Name" />
        <TextField label="Email" type="email" />
        <TextField label="Password" type="password" />
        <TextField label="Confirm password" type="password" />
        <TextField label="Age" type="number" />
        <Label as="fieldset">
          Gender
          <div className="mt-1 flex gap-5">
            <RadioButton label="Male" name="gender" value="male" />
            <RadioButton label="Female" name="gender" value="female" />
          </div>
        </Label>
        <Autocomplete options={countryOptions} label="Country" placeholder="Choose a country" />
      </form>
    </Box>
  );
};

export default UncontrolledForm;
