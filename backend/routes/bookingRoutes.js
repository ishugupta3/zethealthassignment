import express from "express";
import { bookPathology, bookRadiology, getBookings, deleteBooking } from "../controllers/bookingController.js";

const router = express.Router();
router.post("/pathology", bookPathology);
router.post("/radiology", bookRadiology);
router.get("/", getBookings);
router.delete("/:id", deleteBooking);

export default router;
