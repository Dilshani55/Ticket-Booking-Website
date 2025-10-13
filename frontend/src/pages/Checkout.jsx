import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBooking } from "../services/bookingService";
import { createCheckout } from "../services/paymentService";

// Stripe
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function Checkout() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const seats = new URLSearchParams(location.search).get("seats")?.split(",") || [];
  const date = new URLSearchParams(location.search).get("date");

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [customer, setCustomer] = useState({ name: "", address: "", idNumber: "", phone: "" });

  const handleConfirm = async () => {
    if (paymentMethod === "theater") {
      if (!customer.name || !customer.address || !customer.idNumber || !customer.phone) {
        alert("Please fill all required fields!");
        return;
      }

      await createBooking({
        movieId: id,
        seats,
        date,
        paymentMethod,
        customer
      });

      alert("✅ Booking Reserved! Please pay at theater.");
      navigate("/profile");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen px-60 mt-25 py-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="mb-8">
        <h2 className="text-xl">Selected Seats: {seats.join(", ")}</h2>
        <p>Date: {date}</p>
      </div>

      {/* Payment Option Selection */}
      <div className="space-y-4 mb-6">
        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="method"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          💳 Pay by Card
        </label>
        <label className="flex items-center gap-3">
          <input
            type="radio"
            name="method"
            value="theater"
            checked={paymentMethod === "theater"}
            onChange={() => setPaymentMethod("theater")}
          />
          🎟 Pay at Theater (+ extra fee)
        </label>
      </div>

      {/* Card Payment Form */}
      {paymentMethod === "card" && (
        <Elements stripe={stripePromise}>
          <StripeCardForm id={id} seats={seats} date={date} />
        </Elements>
      )}

      {/* Theater Payment Form */}
      {paymentMethod === "theater" && (
        <div className="mt-6 space-y-3">
          <input
            className="w-full p-2 rounded bg-gray-800"
            placeholder="Name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          <input
            className="w-full p-2 rounded bg-gray-800"
            placeholder="Address"
            value={customer.address}
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          />
          <input
            className="w-full p-2 rounded bg-gray-800"
            placeholder="ID Number"
            value={customer.idNumber}
            onChange={(e) => setCustomer({ ...customer, idNumber: e.target.value })}
          />
          <input
            className="w-full p-2 rounded bg-gray-800"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          />

          <button
            onClick={handleConfirm}
            className="mt-4 bg-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-700"
          >
            Confirm Booking →
          </button>
        </div>
      )}
    </div>
  );
}

// Stripe Card Payment Form
function StripeCardForm({ id, seats, date }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);

    try {
      await createCheckout({ movieId: id, seats, date });
    } catch (err) {
      alert("Payment failed: " + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  // Optional: custom styles for Stripe inputs
  const inputStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#000",
        "::placeholder": { color: "#888" },
      },
    },
  };

  return (
    <div className="bg-[#161616] p-6 rounded-lg mt-4">
      <h2 className="text-lg mb-4">Enter Card Details</h2>

      <div className="space-y-4">
        {/* Card Number */}
        <div className="p-3 bg-white rounded text-black">
          <CardNumberElement options={inputStyle} />
        </div>

        {/* Expiry + CVC side by side */}
        <div className="flex gap-4">
          <div className="flex-1 p-3 bg-white rounded text-black">
            <CardExpiryElement options={inputStyle} />
          </div>
          <div className="flex-1 p-3 bg-white rounded text-black">
            <CardCvcElement options={inputStyle} />
          </div>
        </div>
      </div>

      <button
        disabled={!stripe || loading}
        onClick={handlePayment}
        className="w-full mt-6 bg-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay with Card"}
      </button>
    </div>
  );
}

export default Checkout;