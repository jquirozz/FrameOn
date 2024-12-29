import { useEffect, useState } from "react";

export default function useDebounce(input, delay = 600) {
  const [value, setValue] = useState(input);

  useEffect(() => {
    const debouncer = setTimeout(() => {
      setValue(input);
    }, delay);

    return () => {
      clearTimeout(debouncer);
    };
  }, [input, delay]);

  return value;
}
