import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import HomePage from './pages/homepage/HomePage';
import NotFoundPage from './pages/notfoundpage/NotFoundPage';
import TechBestPracticePage from './pages/journalpage/TechBestPracticePage';
import FeetPage from './pages/feetpage/FeetPage';
import PdfPage from './pages/pdfpage/PdfPage';
import ArthurPage from './pages/portfolio/ArthurPage';
import NghiPage from './pages/portfolio/NghiPage';
import TogglePage from './pages/togglePage/TogglePage';
import './utils/i18n';
import './index.less';

export const routePaths = {
  home: '',
  techBestPractice: 'tech-best-practice',
  feet: 'feet',
  pdf: 'pdf',
  arthur: 'arthur',
  nghi: 'nghi',
  toggle: 'toggle',
};

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: routePaths.techBestPractice, element: <TechBestPracticePage /> },
      { path: routePaths.feet, element: <FeetPage /> },
      { path: routePaths.pdf, element: <PdfPage /> },
      { path: routePaths.arthur, element: <ArthurPage /> },
      { path: routePaths.nghi, element: <NghiPage /> },
      { path: routePaths.toggle, element: <TogglePage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

reportWebVitals();
