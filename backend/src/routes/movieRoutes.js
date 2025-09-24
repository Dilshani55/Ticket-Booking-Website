import express from "express";
import {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getMovies);           // GET all movies
router.get("/:id", getMovieById);     // GET single movie

// Protected routes (admin only)
router.post("/", protect, admin, addMovie);       // Add movie
router.put("/:id", protect, admin, updateMovie);  // Update movie
router.delete("/:id", protect, admin, deleteMovie); // Delete movie

export default router;