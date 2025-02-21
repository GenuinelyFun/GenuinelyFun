import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import HomePage from './pages/homepage/HomePage';
import NotFoundPage from './pages/notfoundpage/NotFoundPage';
import ArticlePage from './pages/articlepage/ArticlePage';
import FeetPage from './pages/feetpage/FeetPage';
import ArthurPage from './pages/portfolio/ArthurPage';
import NghiPage from './pages/portfolio/NghiPage';
import './utils/i18n';
import './index.less';
import { journalMetadata } from './utils/journal-utils';
import { ArticleWrapper } from './pages/articlepage/ArticleWrapper';

export const COMPANY_NAME = 'Genuinely Fun';

export const routePaths = {
  home: '',
  article: 'article/',
  feet: 'feet',
  arthur: 'arthur',
  nghi: 'nghi',
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
      {
        path: routePaths.article,
        children: [
          {
            index: true,
            element: <ArticlePage />,
          },
          ...journalMetadata.map((article) => ({
            path: article.path,
            element: <ArticleWrapper article={article} />,
          })),
        ],
      },
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
