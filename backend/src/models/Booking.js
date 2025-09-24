import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  seats: [String], // e.g. ["A1", "A2", "B5"]
  totalPrice: Number,
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;