import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

function SeatSelection() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const date = new URLSearchParams(location.search).get("date");

  const allSeats = Array.from({ length: 30 }, (_, i) => A${i + 1});

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      alert("Select at least one seat!");
      return;
    }
    navigate(/checkout/${id}?date=${date}&seats=${selectedSeats.join(",")});
  };

  return (
    <div className="bg-black text-white min-h-screen px-25 mt-25 py-12">
      <h1 className="text-2xl mb-6">🎟 Select Your Seats</h1>
      <div className="grid grid-cols-6 gap-3 mb-10">
        {allSeats.map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            className={w-12 h-12 rounded ${selectedSeats.includes(seat) ? "bg-pink-600" : "bg-gray-700"}}
          >
            {seat}
          </button>
        ))}
      </div>
      <button onClick={handleCheckout} className="bg-pink-600 px-6 py-2 rounded-lg">
        Proceed to checkout →
      </button>
    </div>
  );
}

export default SeatSelection;