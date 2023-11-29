import TextField from '../components/TextField';
import { useForm } from 'react-hook-form';

type FormFields = {
  firstName: string;
};

const UncontrolledForm = () => {
  const { register } = useForm<FormFields>();

  return <TextField label="First Name" {...register('firstName')} />;
};

export default UncontrolledForm;
