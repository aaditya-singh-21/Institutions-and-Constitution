import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Home/Home.css'; 
import Home from './Home/Home';
import MoreInfo from './More Info/MoreInfo';
import MindMap from './Mind Map/mindmap';

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
