import React, { useEffect, useState } from "react";
import { getRadiologyTests, bookRadiology } from "../services/api";
import RadiologyCard from "../components/RadiologyCard";
import { useNavigate } from "react-router-dom";

export default function Radiology() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRadiologyTests().then(setTests);
  }, []);

  const handleBooking = (testId) => {
    const name = prompt("Enter your name:");
    const phone = prompt("Enter your phone number:");
    const slot = prompt("Enter slot time:");
    if (name && phone && slot) {
      bookRadiology({ testType: "RadiologyTest", testId, name, phone, slot }).then((res) => {
        alert(`Booking confirmed! ID: ${res.bookingId}`);
        navigate("/bookings");
      }).catch((err) => console.error("Error booking:", err));
    } else {
      alert("All fields are required.");
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
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Radiology Tests</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tests.map((test) => (
            <RadiologyCard key={test._id} test={test} handleBooking={handleBooking} />
          ))}
        </div>
      </div>
    </div>
  );
}
