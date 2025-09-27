import React, { useState } from "react";
import { placeOrder } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    if (!name || !phone || !address) {
      alert("Please fill in all fields: name, phone, address.");
      return;
    }
    const payload = {
      medicines: cart.map(item => ({ medicine: item.medicine._id, quantity: item.quantity })),
      totalPrice,
      name,
      phone,
      address
    };
    try {
      const res = await placeOrder(payload);
      if (res.orderId) {
        clearCart();
        navigate(`/confirmation/${res.orderId}`);
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
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
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center py-8 text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.medicine._id} className="flex items-center justify-between p-6 border border-gray-200 rounded-lg mb-4 shadow-sm">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{item.medicine.name}</h3>
                  <p className="text-gray-600">₹{item.medicine.price} each</p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.medicine._id, item.quantity - 1)}
                    className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.medicine._id, item.quantity + 1)}
                    className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 transition duration-200"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.medicine._id)}
                    className="ml-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-8 p-6 border border-gray-200 rounded-lg shadow-md bg-green-50">
              <h3 className="font-bold text-xl text-gray-800 mb-4">Total: ₹{totalPrice}</h3>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                  required
                />
                <textarea
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 mb-2 border border-gray-300 rounded"
                  rows="3"
                  required
                />
              </div>
              <button
                onClick={handlePlaceOrder}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
