import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";
import Booking from "../models/Booking.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

// Stripe Webhook
export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).send(Webhook Error: ${err.message});
  }

  // Handle specific event type
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const bookingId = session.metadata.bookingId;
      await Booking.findByIdAndUpdate(bookingId, { paymentStatus: "paid" });
      console.log(✅ Booking ${bookingId} marked as paid);
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  }

  res.json({ received: true });
};