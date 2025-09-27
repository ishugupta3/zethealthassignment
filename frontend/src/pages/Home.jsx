import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Zet Health</h1>
        <p className="text-lg text-gray-600 mb-6">Your one-stop solution for medicines, pathology tests, and radiology services.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/medicines" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Medicines</Link>
          <Link to="/pathology" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Pathology Tests</Link>
          <Link to="/radiology" className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">Radiology Tests</Link>
          <Link to="/cart" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">Cart</Link>
          <Link to="/bookings" className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">My Bookings</Link>
        </div>
      </div>
    </div>
  );
}
