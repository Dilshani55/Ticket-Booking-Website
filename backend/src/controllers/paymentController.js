import Stripe from "stripe";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

// Create Stripe Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    const { movieId, seats } = req.body;

    // Validate input
    if (!movieId || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: "Movie ID and seats are required" });
    }

    // Find movie
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Check seat availability (critical fix)
    const existingBooking = await Booking.findOne({
      movie: movieId,
      seats: { $in: seats },
      paymentStatus: { $in: ["pending", "paid"] }, 
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "One or more selected seats are already reserved or booked",
      });
    }

    // Calculate total
    const totalPrice = seats.length * movie.price;

    // Save booking with "pending" status
    const booking = await Booking.create({
      user: req.user._id,
      movie: movieId,
      seats,
      totalPrice,
      paymentStatus: "pending",
      createdAt: new Date(),
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: process.env.CURRENCY || "usd", 
            product_data: { name: movie.title },
            unit_amount: movie.price * 100, 
          },
          quantity: seats.length,
        },
      ],
      mode: "payment",
      success_url: ${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID},
      cancel_url: ${process.env.CLIENT_URL}/payment-cancel,
      metadata: {
        bookingId: booking._id.toString(), 
        userId: req.user._id.toString(),
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    res.status(500).json({
      message: "Payment session failed",
      error: err.message,
    });
  }
};