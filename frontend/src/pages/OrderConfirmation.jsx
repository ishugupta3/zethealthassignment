import React, { useEffect, useState } from "react";
import { getOrderById } from "../services/api";
import { useParams } from "react-router-dom";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrderById(id)
      .then((data) => {
        if (data.message && !data._id) {
          setError(data.message);
          setOrder(null);
        } else {
          setOrder(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching order:", err);
        setError("Network error or server issue. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
      }}
    >
      <div className="max-w-md mx-auto p-6 bg-white bg-opacity-90 shadow-lg rounded-lg">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    </div>
  );
  if (!order) return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
      }}
    >
      <div className="max-w-md mx-auto p-6 bg-white bg-opacity-90 shadow-lg rounded-lg">
        <p className="text-center py-8 text-gray-500">Order not found.</p>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
      }}
    >
      <div className="max-w-6xl mx-auto p-6 bg-white bg-opacity-90 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Order Confirmation</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <p className="text-green-700 font-bold text-lg">Order placed successfully!</p>
        </div>
        <div className="space-y-4">
          <p><strong className="text-gray-700">Order ID:</strong> {order._id}</p>
          <p><strong className="text-gray-700">Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          <h3 className="font-bold text-xl mt-6 mb-4 text-gray-800">Medicines:</h3>
          <ul className="space-y-2">
            {(order.medicines || []).map((item, index) => (
              <li key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.medicine?.name || 'Unknown'}</span>
                  <span>Quantity: {item.quantity} - ₹{(item.medicine?.price || 0) * item.quantity}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="font-bold text-xl mt-6 text-gray-800">Total Price: ₹{order.totalPrice}</p>
        </div>
      </div>
    </div>
  );
}
