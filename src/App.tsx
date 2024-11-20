import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PetsGrid from './PetsGrid';
import AboutMe from './AboutMe';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PetsGrid />} /> {/* Main page */}
        <Route path="/about-me/:id" element={<AboutMe />} /> Description page
      </Routes>
    </Router>
  );
};

export default App;
