import express from "express";
import { bookPathology, bookRadiology } from "../controllers/bookingController.js";

const router = express.Router();
router.post("/pathology", bookPathology);
router.post("/radiology", bookRadiology);

export default router;
