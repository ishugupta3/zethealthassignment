import express from "express";
import { getPathologyTests } from "../controllers/pathologyController.js";

const router = express.Router();
router.get("/", getPathologyTests);

export default router;
