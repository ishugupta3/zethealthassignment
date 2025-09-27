import React, { useEffect, useState } from "react";
import { getMedicines } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import MedicineCard from "../components/MedicineCard";

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { cart, addToCart, totalItems } = useCart();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMedicines(search)
      .then((data) => {
        console.log("Medicines fetched:", data);
        setMedicines(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching medicines:", err);
        setError("Failed to load medicines. Please check if the backend server is running.");
        setLoading(false);
      });
  }, [search]);



  const viewCart = () => {
    navigate("/cart");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
      }}
    >
      <div className="max-w-6xl mx-auto p-6 bg-white bg-opacity-90 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Medicines</h2>
        <input
          type="text"
          placeholder="Search medicines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="col-span-full text-center py-8 text-gray-500">Loading medicines...</p>
          ) : error ? (
            <p className="col-span-full text-center py-8 text-red-500">{error}</p>
          ) : medicines.length > 0 ? (
            medicines.map((med) => (
              <MedicineCard key={med._id} medicine={med} addToCart={addToCart} />
            ))
          ) : (
            <p className="col-span-full text-center py-8 text-gray-500">No medicines found. Please ensure the backend is running and data is seeded.</p>
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-8 p-6 border border-gray-200 rounded-lg shadow-md bg-blue-50">
            <h3 className="font-bold text-xl text-gray-800 mb-4">Cart ({totalItems} items)</h3>
            <button
              onClick={viewCart}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              View Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
