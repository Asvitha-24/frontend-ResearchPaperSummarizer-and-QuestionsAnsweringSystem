import React, { createContext, useState } from 'react';

export const PaperContext = createContext();

export const PaperProvider = ({ children }) => {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <PaperContext.Provider value={{ selectedPaper, setSelectedPaper, summary, setSummary, loading, setLoading }}>
      {children}
    </PaperContext.Provider>
  );
};
