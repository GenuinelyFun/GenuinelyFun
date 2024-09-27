import React from "react";
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import FeetPage from "./pages/FeetPage";
import "./App.css";

const App = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/feet" element={<FeetPage/>}/>
        </Routes>
    );
};

export default App;