import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './css/index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queryClient';

// Create a QueryClient instance
// const queryClient = new QueryClient();
if (import.meta.env.NODE_ENV === 'development') {
  // Disable COOP in development to allow Google's postMessage
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || {};
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.isDisabled = true;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);