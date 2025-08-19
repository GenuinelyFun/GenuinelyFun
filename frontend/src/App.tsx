import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import FeedbackBanner from './components/FeedbackBanner.tsx';
import Footer from './components/Footer';
import Header from './components/Header';
import { DarkmodeProvider } from './utils/DarkmodeProvider';
import { DataProvider } from './utils/DataProvider.tsx';
import { LanguageContextProvider } from './utils/i18n/LanguageProvider';

const App: FC = () => {
  return (
    <LanguageContextProvider>
      <DarkmodeProvider>
        <DataProvider>
          <ScrollRestoration getKey={(location) => location.key} />
          <Toaster position="top-center" reverseOrder={false} />
          <Header />
          <FeedbackBanner />
          <Outlet />
          <Footer />
        </DataProvider>
      </DarkmodeProvider>
    </LanguageContextProvider>
  );
};

export default App;
