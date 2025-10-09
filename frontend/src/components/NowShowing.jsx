import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { getMovies } from "../api/movieApi"; // service

function NowShowing() {
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // Start with 8

  // Fetch movies from backend
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await getMovies(); // call: GET /api/movies
        setMovies(data);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };
    fetchMovies();
  }, []);

  const showMore = () => {
    setVisibleCount(12); // ✅ Only increase to 12
  };

  const showLess = () => {
    setVisibleCount(8); // ✅ Reset back to 8
  };

  return (
    <section className="px-30 py-12 mt-40">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Now Showing</h2>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {movies.slice(0, visibleCount).map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {/* Show More / See Less Toggle */}
      <div className="text-center mt-10 flex justify-center gap-4">
        {visibleCount === 8 && movies.length > 8 ? (
          <button
            onClick={showMore}
            className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-full transition duration-300"
          >
            Show More
          </button>
        ) : visibleCount === 12 ? (
          <button
            onClick={showLess}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-full transition duration-300"
          >
            See Less
          </button>
        ) : null}
      </div>
    </section>
  );
}

export default NowShowing;