import { FC } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import { DarkmodeProvider } from './utils/DarkmodeProvider';
import { LanguageContextProvider } from './utils/LanguageProvider';

export const routePaths = {
  home: '',
  dropzone: 'dropzone',
  techBestPractice: 'tech-best-practice',
  feet: 'feet',
  arthur: 'arthur',
  nghi: 'nghi',
};

const App: FC = () => {
  return (
    <LanguageContextProvider>
      <DarkmodeProvider>
        <ScrollRestoration getKey={(location) => location.key} />
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        <Outlet />
        <Footer />
      </DarkmodeProvider>
    </LanguageContextProvider>
  );
};

export default App;
