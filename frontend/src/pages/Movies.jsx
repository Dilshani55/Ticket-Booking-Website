import { useEffect, useState } from "react";
import { getMovies } from "../api/movieApi";

function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(({ data }) => setMovies(data));
  }, []);

  return (
    <div className="px-25 mt-20 py-10 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-8">🎬 Available Movies</h2>

      {/* Grid Layout */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((m) => (
          <div
            key={m._id}
            className="bg-[#161616] rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-all duration-300"
          >
            {/* Movie Poster */}
            <img
              src={m.poster}
              alt={m.title}
              className="w-full h-64 object-cover"
            />

            {/* Movie Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{m.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-3 mb-3">
                {m.description}
              </p>

              {/* Footer: Buy Ticket & Rating */}
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => window.location.href=/movie/${m._id}} 
                  className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md text-sm font-medium">
                  Buy Ticket
              </button>

                {/* Simple review icon */}
                <div className="flex items-center text-yellow-400 gap-1">
                  <span>⭐</span>
                  {/* Just showing static rating 4.5 until reviews system exists */}
                  <span className="text-gray-300 text-sm">4.5</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;