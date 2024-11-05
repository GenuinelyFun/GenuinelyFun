import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/homepage/HomePage';
import NotFoundPage from './pages/notfoundpage/NotFoundPage';
import FeetPage from './pages/feetpage/FeetPage';
import DropZonePage from './pages/journalpage/DropZonePage';
import TechBestPracticePage from './pages/journalpage/TechBestPracticePage';
import ArthurPage from './pages/portfolio/ArthurPage';
import NghiPage from './pages/portfolio/NghiPage';

export const routePaths = {
  home: '/',
  dropzone: '/dropzone',
  techBestPractice: '/tech-best-practice',
  feet: '/feet',
  arthur: '/arthur',
  nghi: '/nghi',
};

const App = (): JSX.Element => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Routes>
        <Route path={routePaths.home} element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path={routePaths.dropzone} element={<DropZonePage />} />
        <Route
          path={routePaths.techBestPractice}
          element={<TechBestPracticePage />}
        />
        <Route path={routePaths.feet} element={<FeetPage />} />
        <Route path={routePaths.arthur} element={<ArthurPage />} />
        <Route path={routePaths.nghi} element={<NghiPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
