import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import { DarkmodeProvider } from './utils/DarkmodeProvider';
import { LanguageContextProvider } from './utils/i18n/LanguageProvider';

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
