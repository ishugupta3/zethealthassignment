import React, { useEffect, useState } from "react";
import { getBookings, deleteBooking, getOrders } from "../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
    fetchOrders();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings. Please check if the backend server is running.");
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please check if the backend server is running.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking(id);
        alert("Booking deleted successfully");
        fetchBookings(); // Refresh the list
      } catch (err) {
        console.error("Error deleting booking:", err);
        alert("Failed to delete booking");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
      }}
    >
      <div className="max-w-6xl mx-auto p-6 bg-white bg-opacity-90 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">Test Bookings</h3>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p><strong className="text-gray-700">Name:</strong> {booking.name}</p>
                  <p><strong className="text-gray-700">Phone:</strong> {booking.phone}</p>
                  <p><strong className="text-gray-700">Test Type:</strong> {booking.testType}</p>
                  <p><strong className="text-gray-700">Slot:</strong> {booking.slot}</p>
                  <p className="md:col-span-2"><strong className="text-gray-700">Booking Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete Booking
                </button>
              </div>
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">No test bookings found.</p>
          )}

          <h3 className="text-2xl font-bold text-gray-800">Medicine Orders</h3>
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="p-6 border border-gray-200 rounded-lg shadow-sm bg-blue-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p><strong className="text-gray-700">Name:</strong> {order.name}</p>
                  <p><strong className="text-gray-700">Phone:</strong> {order.phone}</p>
                  <p><strong className="text-gray-700">Address:</strong> {order.address}</p>
                  <p><strong className="text-gray-700">Total Price:</strong> ₹{order.totalPrice}</p>
                  <p className="md:col-span-2"><strong className="text-gray-700">Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                  <div className="md:col-span-2">
                    <strong className="text-gray-700">Medicines:</strong>
                    <ul className="list-disc list-inside mt-2">
                      {order.medicines.map((med, index) => (
                        <li key={index}>{med.medicine ? med.medicine.name : 'Unknown'} - Quantity: {med.quantity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
