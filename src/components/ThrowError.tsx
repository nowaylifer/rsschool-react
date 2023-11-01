import { useState } from 'react';
import Button from './Button';

const ThrowError = () => {
  const [isError, setIsError] = useState(false);

  if (isError) throw new Error('Test Error');

  return (
    <Button className="bg-red-500 hover:bg-red-600" onClick={() => setIsError(true)}>
      Throw error
    </Button>
  );
};

export default ThrowError;
