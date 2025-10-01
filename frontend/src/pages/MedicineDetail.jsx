import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMedicines } from "../services/api";
import { useCart } from "../context/CartContext";

export default function MedicineDetail() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    getMedicines()
      .then((data) => {
        const med = data.find((m) => m._id === id);
        if (med) {
          setMedicine(med);
        } else {
          setError("Medicine not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load medicine details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
  if (!medicine) return <p className="text-center py-8">Medicine not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <div className="flex flex-col md:flex-row">
          <img src={medicine.image} alt={medicine.name} className="w-full md:w-1/2 h-64 object-cover rounded mb-4 md:mb-0 md:mr-6" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{medicine.name}</h1>
            <p className="text-lg mb-2"><strong>Brand:</strong> {medicine.brand}</p>
            <p className="text-lg mb-2"><strong>Form:</strong> {medicine.form}</p>
            <p className="text-lg mb-2"><strong>Dosage:</strong> {medicine.dosage}</p>
            <p className="text-lg mb-2"><strong>Price:</strong> ₹{medicine.price}</p>
            <p className="text-lg mb-2"><strong>Stock:</strong> {medicine.stock}</p>
            <p className="text-lg mb-4"><strong>Description:</strong> {medicine.description}</p>
            <button
              onClick={() => addToCart(medicine)}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
