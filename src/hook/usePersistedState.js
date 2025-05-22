"use client";

import { useEffect, useState } from "react";

export default function usePersistedState(
  key,
  defaultValue,
  expirationMinutes
) {
  const getInitialValue = () => {
    if (typeof window === "undefined") return defaultValue;
    const saved = localStorage.getItem(key);
    if (saved) {
      const { value, timestamp } = JSON.parse(saved);
      const now = new Date().getTime();
      const expirationMs = expirationMinutes * 60 * 1000;
      if (now - timestamp < expirationMs) {
        return value;
      }
      localStorage.removeItem(key);
    }
    return defaultValue;
  };

  const [value, setValue] = useState(getInitialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = {
        value,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(key, JSON.stringify(data));
    }
  }, [key, value]);

  return [value, setValue];
}
