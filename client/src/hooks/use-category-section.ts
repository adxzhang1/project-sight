import { useState } from 'react';

export const useCategorySection = () => {
  const [isNewOpen, setIsNewOpen] = useState(false);

  return {
    isNewOpen,
    setIsNewOpen,
  };
};
