import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Zet Health 🚑</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/medicines" className="hover:underline">Medicines</Link>
        <Link to="/pathology" className="hover:underline">Pathology</Link>
        <Link to="/radiology" className="hover:underline">Radiology</Link>
      </div>
    </nav>
  );
}
