import { useState, useEffect } from "react";

const useLocalStorage = (
  key: string,
  initialValue: string[]
): [string[], (value: string[]) => void] => {
  const [value, setValue] = useState<string[]>(() => {
    // Check if localStorage exists (i.e., if we are on the client side)
    if (typeof window === "undefined") {
      return initialValue;
    }

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
    // Check if localStorage exists (i.e., if we are on the client side)
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
