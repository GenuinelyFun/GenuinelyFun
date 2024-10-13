import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/homepage/HomePage';
import FeetPage from './pages/feetpage/FeetPage';
import DropZonePage from './pages/journalpage/DropZonePage';
import TechBestPracticePage from './pages/journalpage/TechBestPracticePage';

const App = (): JSX.Element => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dropzone" element={<DropZonePage />} />
        <Route path="/tech-best-practice" element={<TechBestPracticePage />} />
        <Route path="/feet" element={<FeetPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
