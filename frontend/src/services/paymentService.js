import API from "./api";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe instance with publishable key from environment (.env file in frontend)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Create Stripe checkout session and redirect
export const createCheckout = async ({ movieId, seats }) => {
  try {
    // Call backend to create checkout session
    const { data } = await API.post("/payment/checkout", { movieId, seats });

    // Load Stripe
    const stripe = await stripePromise;

    // Redirect to Stripe checkout
    const result = await stripe.redirectToCheckout({ sessionId: data.id });

    if (result.error) {
      console.error("Stripe redirect error:", result.error);
    }
  } catch (err) {
    console.error("❌ Checkout failed:", err.response?.data || err.message);
    throw err;
  }
};