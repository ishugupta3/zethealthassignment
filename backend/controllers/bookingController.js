import Booking from "../models/booking.js";

export const bookPathology = async (req, res) => {
  try {
    const { testType, testId, slot } = req.body;
    const booking = new Booking({ testType, testId, slot });
    const savedBooking = await booking.save();
    res.status(201).json({ bookingId: savedBooking._id, message: "Pathology test booked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const bookRadiology = async (req, res) => {
  try {
    const { testType, testId, slot } = req.body;
    const booking = new Booking({ testType, testId, slot });
    const savedBooking = await booking.save();
    res.status(201).json({ bookingId: savedBooking._id, message: "Radiology test booked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
