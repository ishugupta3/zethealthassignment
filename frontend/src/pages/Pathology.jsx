import React, { useEffect, useState } from "react";
import { getPathologyTests, bookPathology } from "../services/api";
import PathologyCard from "../components/PathologyCard";

export default function Pathology() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    getPathologyTests().then(setTests);
  }, []);

  const handleBooking = (testId) => {
    const slot = prompt("Enter slot time:");
    bookPathology({ testType: "PathologyTest", testId, slot }).then((res) => {
      alert(`Booking confirmed! ID: ${res.bookingId}`);
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pathology Tests</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tests.map((test) => (
          <PathologyCard key={test._id} test={test} handleBooking={handleBooking} />
        ))}
      </div>
    </div>
  );
}
