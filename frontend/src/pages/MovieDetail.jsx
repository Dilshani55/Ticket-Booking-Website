import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/movieService";

function MovieDetail() {
  const { id } = useParams(); // movieId
  const [movie, setMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getMovieById(id).then(setMovie);
  }, [id]);

  const handleBookNow = () => {
    if (!selectedDate) {
      alert("Please select a date first!");
      return;
    }
    navigate(/seat-selection/${id}?date=${selectedDate});
  };

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white px-25 py-12 mt-25">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={movie.poster} alt={movie.title} className="w-64 rounded-lg shadow-lg" />
        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-400">{movie.genre} • {movie.duration} mins • {new Date(movie.releaseDate).getFullYear()}</p>
          <p className="mt-4">{movie.description}</p>
          <div className="flex gap-4 mt-6">
            <button className="bg-pink-600 px-5 py-2 rounded-lg">Watch Trailer</button>
            <button className="bg-pink-600 px-5 py-2 rounded-lg" onClick={handleBookNow}>Buy Tickets</button>
          </div>
        </div>
      </div>

      {/* Date Selector */}
      <div className="mt-10">
        <h2 className="text-xl mb-3">Choose Date</h2>
        <div className="flex gap-4">
          {["2025-02-15", "2025-02-16", "2025-02-17"].map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={px-4 py-2 rounded ${selectedDate === date ? "bg-pink-600" : "bg-gray-700"}}
            >
              {new Date(date).toDateString()}
            </button>
          ))}
        </div>
        <button className="mt-6 bg-pink-600 px-5 py-2 rounded-lg" onClick={handleBookNow}>
          Book Now →
        </button>
      </div>
    </div>
  );
}

export default MovieDetail;