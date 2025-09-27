import React, { useEffect, useState } from "react";
import { getMedicines, placeOrder } from "../services/api";
import MedicineCard from "../components/MedicineCard";

export default function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getMedicines()
      .then((data) => {
        console.log("Medicines fetched:", data);
        setMedicines(data);
      })
      .catch((err) => console.error("Error fetching medicines:", err));
  }, []);

  const addToCart = (medicine) => {
    setCart([...cart, { medicine: medicine._id, quantity: 1 }]);
  };

  const handleOrder = () => {
    placeOrder({ medicines: cart })
      .then((res) => {
        alert(`Order placed! ID: ${res.orderId}`);
        setCart([]);
      })
      .catch((err) => console.error("Error placing order:", err));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Medicines</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {medicines.length > 0 ? (
          medicines.map((med) => (
            <MedicineCard key={med._id} medicine={med} addToCart={addToCart} />
          ))
        ) : (
          <p>Loading medicines...</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 p-4 border rounded shadow">
          <h3 className="font-bold text-lg">Cart ({cart.length})</h3>
          <button
            onClick={handleOrder}
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
