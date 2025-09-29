import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MedicineCard from "../components/MedicineCard";
import PathologyCard from "../components/PathologyCard";
import RadiologyCard from "../components/RadiologyCard";
import { getMedicines, getPathologyTests, getRadiologyTests, bookPathology, bookRadiology } from "../services/api";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [pathologyTests, setPathologyTests] = useState([]);
  const [radiologyTests, setRadiologyTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const [meds, path, rad] = await Promise.all([
        getMedicines(searchTerm),
        getPathologyTests(searchTerm),
        getRadiologyTests(searchTerm)
      ]);
      setMedicines(meds);
      setPathologyTests(path);
      setRadiologyTests(rad);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePathologyBooking = async (id) => {
    try {
      const booking = {
        testId: id,
        userName: "Test User", // Hardcoded; in production, use user context
        email: "test@example.com"
      };
      await bookPathology(booking);
      alert("Pathology test booked successfully!");
    } catch (error) {
      alert("Booking failed: " + error.message);
    }
  };

  const handleRadiologyBooking = async (id) => {
    try {
      const booking = {
        testId: id,
        userName: "Test User", // Hardcoded; in production, use user context
        email: "test@example.com"
      };
      await bookRadiology(booking);
      alert("Radiology test booked successfully!");
    } catch (error) {
      alert("Booking failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')"
        }}
      >
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center max-w-4xl mx-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Zet Health</h1>
          <p className="text-lg text-gray-600 mb-6">Your one-stop solution for medicines, pathology tests, and radiology services.</p>
          
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <input
              type="text"
              placeholder="Search medicines, pathology tests, or radiology tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={loading || !searchTerm.trim()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/medicines" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Medicines</Link>
            <Link to="/pathology" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Pathology Tests</Link>
            <Link to="/radiology" className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600">Radiology Tests</Link>
            <Link to="/cart" className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600">Cart..</Link>
            <Link to="/bookings" className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">My Bookings</Link>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchTerm.trim() && (
        <div className="max-w-6xl mx-auto p-6">
          {loading && <p className="text-center text-gray-600">Loading results...</p>}

          {/* Medicines Results */}
          {medicines.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Medicines</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {medicines.map((medicine) => (
                  <MedicineCard
                    key={medicine._id}
                    medicine={medicine}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pathology Results */}
          {pathologyTests.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Pathology Tests</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pathologyTests.map((test) => (
                  <PathologyCard
                    key={test._id}
                    test={{ ...test, description: test.description || "No description available" }}
                    handleBooking={handlePathologyBooking}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Radiology Results */}
          {radiologyTests.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Radiology Tests</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {radiologyTests.map((test) => (
                  <RadiologyCard
                    key={test._id}
                    test={{ ...test, description: test.description || "No description available" }}
                    handleBooking={handleRadiologyBooking}
                  />
                ))}
              </div>
            </div>
          )}

          {medicines.length === 0 && pathologyTests.length === 0 && radiologyTests.length === 0 && !loading && (
            <p className="text-center text-gray-600">No results found for "{searchTerm}". Try a different search term.</p>
          )}
        </div>
      )}
    </div>
  );
}
