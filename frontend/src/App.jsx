import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import Pathology from "./pages/Pathology";
import Radiology from "./pages/Radiology";
import "./app.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/pathology" element={<Pathology />} />
        <Route path="/radiology" element={<Radiology />} />
      </Routes>
    </Router>
  );
}

export default App;
