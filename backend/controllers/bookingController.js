import Booking from "../models/booking.js";




export const bookPathology = async (req, res) => {
  try {
    const { testType, testId, name, phone, slot } = req.body;
    const booking = new Booking({ testType, testId, name, phone, slot });
    const savedBooking = await booking.save();
    // const message = `Booking confirmed for Pathology Test. Name: ${name}, Slot: ${slot}, Booking ID: ${savedBooking._id}`;
    res.status(201).json({ bookingId: savedBooking._id, message: "Pathology test booked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const bookRadiology = async (req, res) => {
  try {
    const { testType, testId, name, phone, slot } = req.body;
    const booking = new Booking({ testType, testId, name, phone, slot });
    const savedBooking = await booking.save();
    // const message = `Booking confirmed for Radiology Test. Name: ${name}, Slot: ${slot}, Booking ID: ${savedBooking._id}`;
    res.status(201).json({ bookingId: savedBooking._id, message: "Radiology test booked successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
