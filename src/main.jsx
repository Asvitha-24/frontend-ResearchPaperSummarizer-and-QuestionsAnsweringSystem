import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

// Clear old localStorage data on startup to prevent quota errors
// This runs once when the app loads
if (typeof window !== 'undefined') {
  try {
    // Check if localStorage is nearly full
    const testKey = '__localStorage_test__';
    const testValue = new Array(1024 * 1024).join('x'); // 1MB test
    
    try {
      localStorage.setItem(testKey, testValue);
      localStorage.removeItem(testKey);
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        console.warn('⚠️ localStorage quota exceeded, clearing old data...');
        // Clear non-essential localStorage data
        try {
          const keys = Object.keys(localStorage);
          for (let key of keys) {
            if (key !== 'app-storage' && !key.startsWith('persist:')) {
              localStorage.removeItem(key);
            }
          }
          // If app-storage exists and is huge, also clear it
          const appStorage = localStorage.getItem('app-storage');
          if (appStorage && appStorage.length > 500000) { // > 500KB
            localStorage.removeItem('app-storage');
            console.log('✅ Cleared old app-storage to prevent quota errors');
          }
        } catch (err) {
          console.error('Failed to clear localStorage:', err);
        }
      }
    }
  } catch (err) {
    console.error('localStorage initialization error:', err);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
