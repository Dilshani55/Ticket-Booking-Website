// backend/src/routes/theatreRoutes.js
import express from "express";
import { getTheatres, addTheatre } from "../controllers/theatreController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTheatres); // Public
router.post("/", protect, admin, addTheatre); 

export default router;