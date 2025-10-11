import { useEffect, useState } from "react";
import { getTheatres } from "../api/theatreApi";

function Theatres() {
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    getTheatres()
      .then((data) => setTheatres(data))
      .catch((err) => console.error("Failed to fetch theatres:", err));
  }, []);

  return (
    <div className="bg-[#0b0b0b] text-white min-h-screen px-25 mt-20 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        🎭 Available <span className="text-pink-500">Theatres</span>
      </h1>

      {theatres.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {theatres.map((theatre) => (
            <div
              key={theatre._id}
              className="bg-[#161616] rounded-xl shadow-lg overflow-hidden hover:shadow-pink-500/20 transition-all"
            >
              {/* ✅ Always show a poster (fallback if missing) */}
              <img
                src={
                  theatre.poster && theatre.poster.trim() !== ""
                    ? theatre.poster
                    : "https://via.placeholder.com/400x250?text=No+Poster"
                }
                alt={theatre.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{theatre.name}</h2>
                <p className="text-gray-400">📍 {theatre.location}</p>
                <p className="text-gray-400">🎬 Screens: {theatre.screens}</p>
                <p className="text-gray-400">📞 {theatre.contact}</p>

                {/* Movies Currently Showing */}
                {theatre.movies?.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-pink-500 font-semibold mb-2">Now Showing</h3>
                    <ul className="space-y-2">
                      {theatre.movies.map(
                        (m) =>
                          m.movie && (
                            <li
                              key={m.movie._id}
                              className="flex justify-between items-center bg-[#1f1f1f] rounded p-2"
                            >
                              <div>
                                <p className="font-semibold">{m.movie.title}</p>
                                <p className="text-sm text-gray-400">
                                  {m.showTimes?.join(", ")}
                                </p>
                              </div>
                              <img
                                src={
                                  m.movie.poster && m.movie.poster.trim() !== ""
                                    ? m.movie.poster
                                    : "https://via.placeholder.com/60x90?text=No+Image"
                                }
                                alt={m.movie.title}
                                className="w-12 h-16 object-cover rounded"
                              />
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-20 text-gray-400">No theatres available</p>
      )}
    </div>
  );
}

export default Theatres;