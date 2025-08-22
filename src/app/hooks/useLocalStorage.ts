import { useState, useEffect } from "react";

const useLocalStorage = (
  key: string,
  initialValue: string[]
): [string[], (value: string[]) => void] => {
  const [value, setValue] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      } else {
        return initialValue;
      }
    } catch (error) {
      console.error("Kunde inte parsa från localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
