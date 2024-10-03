import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { DarkmodeProvider } from './utils/DarkmodeProvider';
import { LanguageContextProvider } from './utils/LanguageProvider';
import App from './App';
import './utils/i18n';
import './index.less';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <DarkmodeProvider>
      <LanguageContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageContextProvider>
    </DarkmodeProvider>
  </React.StrictMode>,
);

reportWebVitals();
