import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FeetPage from './pages/FeetPage';
import Header from './components/Header';
import './App.css';

const App = (): JSX.Element => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/feet" element={<FeetPage />} />
            </Routes>
        </>
    );
};

export default App;