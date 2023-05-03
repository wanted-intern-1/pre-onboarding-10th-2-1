import { useState, useEffect } from 'react';

export function useDebounce(value:string) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debouncedValue;
}