import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FeetPage from './pages/feetpage/FeetPage';
import Header from './components/Header';
import DarkmodeToggle from './components/DarkmodeToggle';

const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <DarkmodeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feet" element={<FeetPage />} />
      </Routes>
    </>
  );
};

export default App;
