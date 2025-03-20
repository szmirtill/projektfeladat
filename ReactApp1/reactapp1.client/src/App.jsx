/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Style/App.css';
import MainPage from './mainpage';
import Registration from './Registration';
import MainPage2 from "./MainPage2";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/mainpage" element={<MainPage2/> } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
