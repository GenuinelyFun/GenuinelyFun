import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { DarkmodeProvider } from './utils/DarkmodeProvider';
import App from './App';
import './index.less';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <DarkmodeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DarkmodeProvider>
  </React.StrictMode>,
);

reportWebVitals();
