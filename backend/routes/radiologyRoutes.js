import express from "express";
import { getRadiologyTests } from "../controllers/radiologyController.js";

const router = express.Router();
router.get("/", getRadiologyTests);

export default router;
