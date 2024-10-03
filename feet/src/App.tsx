import { Route, Routes } from 'react-router-dom';
import LanguageSelect from './components/SwitchLanguageButton';
import DarkmodeToggle from './components/DarkmodeToggle';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/homepage/HomePage';
import FeetPage from './pages/feetpage/FeetPage';

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <LanguageSelect />
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
