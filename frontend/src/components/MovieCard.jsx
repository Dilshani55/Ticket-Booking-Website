import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div className="bg-[#161616] rounded-xl shadow-md overflow-hidden hover:scale-105 transition-all duration-300">
      {/* Poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />

      {/* Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{movie.title}</h3>

        <p className="text-gray-400 text-sm mb-3">
          {movie.releaseDate
            ? new Date(movie.releaseDate).getFullYear()
            : ""}{" "}
          • {movie.genre} • {movie.duration}m
        </p>

        <div className="flex items-center justify-between">
          {/* 🔗 Navigate to movie details page */}
          <button
            onClick={() => navigate(/movie/${movie._id})}
            className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            Buy Ticket
          </button>

          {/* ⭐ Rating (static until review system is added) */}
          <div className="flex items-center gap-1 ">
            <span className="text-yellow-400">⭐</span>
            <span>{movie.rating || "4.5"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;