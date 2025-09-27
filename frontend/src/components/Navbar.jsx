import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="no-underline hover:no-underline">
        <h1 className="font-bold text-xl">Zet Health 🚑</h1>
      </Link>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/medicines" className="hover:underline">Medicines</Link>
        <Link to="/cart" className="hover:underline">Cart ({totalItems})</Link>
        <Link to="/pathology" className="hover:underline">Pathology</Link>
        <Link to="/radiology" className="hover:underline">Radiology</Link>
        <Link to="/bookings" className="hover:underline">My Bookings</Link>
      </div>
    </nav>
  );
}
