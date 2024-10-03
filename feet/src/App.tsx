import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import FeetPage from './pages/feetpage/FeetPage';
import Header from './components/Header';
import DarkmodeToggle from './components/DarkmodeToggle';
import Footer from './components/Footer';

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <DarkmodeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feet" element={<FeetPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
