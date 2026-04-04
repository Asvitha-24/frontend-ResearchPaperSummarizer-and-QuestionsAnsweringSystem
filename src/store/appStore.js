import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const appStore = (set) => ({
  // Documents
  documents: [],
  addDocument: (document) =>
    set((state) => {
      // Keep only last 15 documents to prevent storage overflow
      const newDocs = [...state.documents, document];
      return { documents: newDocs.slice(-15) };
    }),
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
    set((state) => {
      // Keep only last 10 entries to prevent localStorage overflow
      const newHistory = [{ ...item, timestamp: new Date().toISOString() }, ...state.history];
      return { history: newHistory.slice(0, 10) };
    }),
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

  // Clear old localStorage data
  clearOldStorageData: () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.clear();
        console.log('✅ Old storage cleared');
      } catch (e) {
        console.error('Failed to clear storage:', e);
      }
    }
  },
});

export const useAppStore = create(
  devtools(
    persist(appStore, {
      name: 'app-storage',
      partialize: (state) => ({
        documents: state.documents.map(doc => ({
          // Exclude large text fields from persistence
          id: doc.id,
          title: doc.title,
          name: doc.name,
          filename: doc.filename,
          fileType: doc.fileType,
          extracted_text_preview: doc.extracted_text_preview,
          summary: doc.summary,
          uploadedAt: doc.uploadedAt,
          originalLength: doc.originalLength,
          summaryLength: doc.summaryLength,
          textTruncated: doc.textTruncated,
        })),
        history: state.history.slice(0, 10), // Limit history to 10 items
        savedResults: state.savedResults.slice(0, 20), // Limit saved results to 20 items
        preferences: state.preferences,
        summaries: state.summaries,
        qaResults: state.qaResults.slice(0, 30), // Limit QA results
      }),
      version: 1, // Cache version for migrations
    })
  )
);
