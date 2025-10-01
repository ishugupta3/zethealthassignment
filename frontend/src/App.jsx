import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Medicines from "./pages/Medicines";
import MedicineDetail from "./pages/MedicineDetail";
import Cart from "./pages/Cart";
import OrderConfirmation from "./pages/OrderConfirmation";
import Pathology from "./pages/Pathology";
import Radiology from "./pages/Radiology";
import Bookings from "./pages/Bookings";
import "./app.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/medicine/:id" element={<MedicineDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/confirmation/:id" element={<OrderConfirmation />} />
            <Route path="/pathology" element={<Pathology />} />
            <Route path="/radiology" element={<Radiology />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
