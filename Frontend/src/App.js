import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Home.css'; 
import Home from './Home';
import MoreInfo from './MoreInfo';
import MindMap from './mindmap';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/more-info" element={<MoreInfo />} />
                <Route path="mind-map" element={<MindMap />} />
            </Routes>
        </Router>
    );
};

export default App;
