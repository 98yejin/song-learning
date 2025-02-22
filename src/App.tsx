import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ThemePage from "./pages/ThemePage";
import SongPage from "./pages/SongPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/theme/:theme" element={<ThemePage />} />
        <Route path="/song/:song" element={<SongPage />} />
      </Routes>
    </Router>
  );
};

export default App;
