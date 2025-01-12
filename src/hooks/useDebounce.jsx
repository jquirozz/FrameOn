import { useEffect, useState } from "react";

export default function useDebounce(input, delay = 800) {
  const [value, setValue] = useState(input);

  useEffect(() => {
    const debouncer = setTimeout(() => {
      const newValue = input.toLowerCase();
      setValue(newValue);
    }, delay);

    return () => {
      clearTimeout(debouncer);
    };
  }, [input, delay]);

  return value;
}
