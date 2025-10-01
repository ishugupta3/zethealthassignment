import React from "react";

export default function RadiologyCard({ test, handleBooking }) {
  return (
    <div className="p-4 border rounded shadow hover:shadow-lg transition">
      <img src={test.image} alt={test.name} className="h-40 w-full object-cover rounded" />
      <h3 className="font-bold text-lg mt-2">{test.name}</h3>
      <p className="text-sm text-gray-600">Lab Name: {test.labName}</p>
      <p className="text-sm text-gray-600">Available Slots: {test.availableSlots.join(", ")}</p>
      <p className="mt-1 font-semibold">₹{test.price}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => handleBooking(test._id)}
          className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
        >
          Book Test
        </button>
      </div>
    </div>
  );
}
