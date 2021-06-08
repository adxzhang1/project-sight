import { useState } from "react";

export const useTest = () => {
  const [count, setCount] = useState(0);
  return {
    count, setCount
  }
}