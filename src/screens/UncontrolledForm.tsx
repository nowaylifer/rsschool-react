import TextField from '@/components/TextField';
import Box from '@/components/Box';
import RadioButton from '@/components/RadioButton';
import Label from '@/components/Label';

const UncontrolledForm = () => {
  return (
    <Box>
      <form>
        <TextField label="Name" />
        <TextField label="Email" type="number" />
        <TextField label="Password" type="password" />
        <TextField label="Confirm password" type="password" />
        <TextField label="Age" type="number" />
        <Label as="fieldset">
          <RadioButton label="Male" name="gender" value="male" />
          <RadioButton label="Female" name="gender" value="female" />
        </Label>
      </form>
    </Box>
  );
};

export default UncontrolledForm;
