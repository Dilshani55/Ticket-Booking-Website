import express from "express";
import { createBooking, getMyBookings, getAllBookings, cancelBooking } from "../controllers/bookingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User routes
router.post("/", protect, createBooking);               // Book tickets
router.get("/mybookings", protect, getMyBookings);     // Get logged-in user’s bookings
router.delete("/:id", protect, cancelBooking);

// Admin-only route
router.get("/", protect, admin, getAllBookings);       // Get all bookings (admin only)

export default router;