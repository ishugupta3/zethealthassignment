import React from "react";
import { useNavigate } from "react-router-dom";

export default function MedicineCard({ medicine, addToCart }) {
  const navigate = useNavigate();

  const viewDetails = () => {
    if (medicine?._id) {
      navigate(`/medicine/${medicine._id}`);
    }
  };

  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      <img
        src={medicine?.image || "/default-image.jpg"}
        alt={medicine?.name ? `${medicine.name} image` : "Medicine image"}
        className="h-40 w-full object-cover rounded"
      />

      <h3 className="font-bold text-lg mt-2">
        {medicine?.name || "Unnamed Medicine"}
      </h3>

      <p className="mt-1 font-semibold">
        ₹{medicine?.price !== undefined ? medicine.price : "N/A"}
      </p>

      <div className="flex gap-2 mt-2">
        <button
          type="button"
          onClick={viewDetails}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          View Details
        </button>

        <button
          type="button"
          onClick={() => addToCart(medicine)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
