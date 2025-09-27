import React, { useEffect, useState } from "react";
import { getRadiologyTests, bookRadiology } from "../services/api";
import RadiologyCard from "../components/RadiologyCard";

export default function Radiology() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    getRadiologyTests().then(setTests);
  }, []);

  const handleBooking = (testId) => {
    const slot = prompt("Enter slot time:");
    bookRadiology({ testType: "RadiologyTest", testId, slot }).then((res) => {
      alert(`Booking confirmed! ID: ${res.bookingId}`);
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Radiology Tests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tests.map((test) => (
          <RadiologyCard key={test._id} test={test} handleBooking={handleBooking} />
        ))}
      </div>
    </div>
  );
}
