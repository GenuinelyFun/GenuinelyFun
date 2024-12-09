import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App, { routePaths } from './App';
import HomePage from './pages/homepage/HomePage';
import NotFoundPage from './pages/notfoundpage/NotFoundPage';
import DropZonePage from './pages/journalpage/DropZonePage';
import TechBestPracticePage from './pages/journalpage/TechBestPracticePage';
import FeetPage from './pages/feetpage/FeetPage';
import ArthurPage from './pages/portfolio/ArthurPage';
import NghiPage from './pages/portfolio/NghiPage';
import './utils/i18n';
import './index.less';

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: routePaths.dropzone, element: <DropZonePage /> },
      { path: routePaths.techBestPractice, element: <TechBestPracticePage /> },
      { path: routePaths.feet, element: <FeetPage /> },
      { path: routePaths.arthur, element: <ArthurPage /> },
      { path: routePaths.nghi, element: <NghiPage /> },
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
