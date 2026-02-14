import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const appStore = (set) => ({
  // Documents
  documents: [],
  addDocument: (document) =>
    set((state) => ({ documents: [...state.documents, document] })),
  removeDocument: (id) =>
    set((state) => ({
      documents: state.documents.filter((d) => d.id !== id),
    })),
  setDocuments: (documents) => set({ documents }),

  // Summaries
  summaries: {},
  addSummary: (paperId, summary) =>
    set((state) => ({
      summaries: { ...state.summaries, [paperId]: summary },
    })),
  removeSummary: (paperId) =>
    set((state) => {
      const newSummaries = { ...state.summaries };
      delete newSummaries[paperId];
      return { summaries: newSummaries };
    }),
  setSummaries: (summaries) => set({ summaries }),

  // Q&A Results
  qaResults: [],
  addQAResult: (result) =>
    set((state) => ({ qaResults: [...state.qaResults, result] })),
  removeQAResult: (id) =>
    set((state) => ({
      qaResults: state.qaResults.filter((r) => r.id !== id),
    })),
  setQAResults: (qaResults) => set({ qaResults }),

  // Search Results
  searchResults: [],
  setSearchResults: (searchResults) => set({ searchResults }),
  clearSearchResults: () => set({ searchResults: [] }),

  // Loading & Error
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  // User History
  history: [],
  addToHistory: (item) =>
    set((state) => ({
      history: [{ ...item, timestamp: new Date().toISOString() }, ...state.history],
    })),
  deleteFromHistory: (id) =>
    set((state) => ({
      history: state.history.filter((h) => h.id !== id),
    })),
  clearHistory: () => set({ history: [] }),

  // Saved Results
  savedResults: [],
  saveResult: (result) =>
    set((state) => ({
      savedResults: [{ ...result, savedAt: new Date().toISOString() }, ...state.savedResults],
    })),
  unsaveResult: (id) =>
    set((state) => ({
      savedResults: state.savedResults.filter((r) => r.id !== id),
    })),

  // User Preferences
  preferences: {
    theme: 'light',
    resultsPerPage: 10,
    sortBy: 'relevance',
    defaultSummaryLength: 150,
  },
  setPreferences: (preferences) => set({ preferences }),
  updatePreference: (key, value) =>
    set((state) => ({
      preferences: { ...state.preferences, [key]: value },
    })),

  // Current Selection
  selectedPaper: null,
  setSelectedPaper: (paper) => set({ selectedPaper: paper }),
  currentDocument: null,
  setCurrentDocument: (document) => set({ currentDocument: document }),

  // Reset Store
  reset: () =>
    set({
      documents: [],
      summaries: {},
      qaResults: [],
      searchResults: [],
      loading: false,
      error: null,
      selectedPaper: null,
      currentDocument: null,
    }),
});

export const useAppStore = create(
  devtools(
    persist(appStore, {
      name: 'app-storage',
      partialize: (state) => ({
        documents: state.documents,
        history: state.history,
        savedResults: state.savedResults,
        preferences: state.preferences,
        summaries: state.summaries,
        qaResults: state.qaResults,
      }),
    })
  )
);
