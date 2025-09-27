import React from "react";

export default function MedicineCard({ medicine, addToCart }) {
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      <img src={medicine.image} alt={medicine.name} className="h-40 w-full object-cover rounded" />
      <h3 className="font-bold text-lg mt-2">{medicine.name}</h3>
      <p className="text-sm">{medicine.description}</p>
      <p className="mt-1 font-semibold">₹{medicine.price}</p>
      <button
        onClick={() => addToCart(medicine)}
        className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
