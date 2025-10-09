import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "../services/movieService";
import { AuthContext } from "../context/AuthContext";
import { checkout } from "../services/paymentService";


function Booking() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie:", err);
      }
    };
    fetchMovie();
  }, [id]);

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = async () => {
  if (!user) {
    alert("Please login to book tickets");
    navigate("/login");
    return;
  }
  try {
    await checkout(id, selectedSeats);
  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};

  if (!movie) return <p>Loading movie...</p>;

  // Simple seat layout (A1 - A5, B1 - B5)
  const seatLayout = ["A1", "A2", "A3", "A4", "A5", "B1", "B2", "B3", "B4", "B5"];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>

      <h3>Pick Seats</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 60px)", gap: "10px", marginBottom: "1rem" }}>
        {seatLayout.map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            style={{
              padding: "10px",
              background: selectedSeats.includes(seat) ? "green" : "#ddd",
              color: selectedSeats.includes(seat) ? "white" : "black",
            }}
          >
            {seat}
          </button>
        ))}
      </div>

      <button onClick={handleBooking} disabled={selectedSeats.length === 0}>
        Confirm Booking ({selectedSeats.length} seats)
      </button>
    </div>
  );
}

export default Booking;
