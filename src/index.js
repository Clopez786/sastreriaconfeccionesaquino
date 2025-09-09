import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

function getBasename() {
  const pu = process.env.PUBLIC_URL || '';
  try {
    return pu ? new URL(pu).pathname.replace(/\/+$/, '') || '/' : '/';
  } catch {
    return pu || '/';
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={getBasename()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
