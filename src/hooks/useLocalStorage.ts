import { useEffect, useState } from 'react';
import lscache from 'lscache';

function useLocalStorage<T>(key: string, initialState: T, expiresIn?: number) {
  const [value, setValue] = useState<T>(() => (lscache.get(key) as T) ?? initialState);

  useEffect(() => {
    if (value == null) {
      lscache.remove(key);
    } else {
      lscache.set(key, value, expiresIn);
    }
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
