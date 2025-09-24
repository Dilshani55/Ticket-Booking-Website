import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

// @desc Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { movieId, seats } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const totalPrice = seats.length * movie.price;

    const booking = await Booking.create({
      user: req.user._id, // from auth middleware
      movie: movieId,
      seats,
      totalPrice,
      paymentStatus: "pending",
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
};

// @desc Get user’s bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("movie", "title showTimes");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
};

// @desc Admin: Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email").populate("movie", "title");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id,
      paymentStatus: "pending" 
    });

    if (!booking) {
      return res.status(404).json({ 
        message: "Booking not found, already paid, or not your booking" 
      });
    }

    await booking.deleteOne();

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel booking", error: err.message });
  }
};