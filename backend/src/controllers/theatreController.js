// backend/src/controllers/theatreController.js
import Theatre from "../models/Theatre.js";

// Get all theatres
export const getTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find().populate("movies.movie", "title poster");
    res.json(theatres);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch theatres", error: err.message });
  }
};

// Admin: Add Theatre
export const addTheatre = async (req, res) => {
  try {
    const { name, location, screens, contact } = req.body;
    if (!name || !location) {
      return res.status(400).json({ message: "Name and Location are required" });
    }

    const theatre = new Theatre({ name, location, screens, contact });
    const saved = await theatre.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to add theatre", error: err.message });
  }
};