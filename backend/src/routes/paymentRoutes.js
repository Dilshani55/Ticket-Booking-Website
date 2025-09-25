import express from "express";
import { createCheckoutSession } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/payment/checkout
router.post("/checkout", protect, createCheckoutSession);

export default router;