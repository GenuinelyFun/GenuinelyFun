import './index.less';
import './utils/i18n.ts';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ArticlePage from './pages/articlepage/ArticlePage';
import { ArticleWrapper } from './pages/articlepage/ArticleWrapper.tsx';
import FeetPage from './pages/feetpage/FeetPage';
import HomePage from './pages/homepage/HomePage';
import NotFoundPage from './pages/notfoundpage/NotFoundPage';
import ArthurPage from './pages/portfolio/ArthurPage';
import NghiPage from './pages/portfolio/NghiPage';
import reportWebVitals from './reportWebVitals';
import { articles } from './utils/article-utils';
import { routePaths } from './utils/route-utils';

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
          ...articles.map((article) => ({
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
createRoot(document.getElementById('root')! as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

reportWebVitals();
