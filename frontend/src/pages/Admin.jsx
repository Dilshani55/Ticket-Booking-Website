import { useEffect, useState } from "react";
import { getMovies, addMovie, deleteMovie, updateMovie } from "../services/movieService";
import { Link } from "react-router-dom";

function Admin() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    poster: "",
    genre: "",
    duration: "",
    releaseDate: "",
    showTimes: "",
    price: ""
  });

  const [editingId, setEditingId] = useState(null); // ⚡ track if we’re editing

  const fetchMovies = async () => {
    const data = await getMovies();
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      duration: Number(form.duration),
      price: Number(form.price),
      showTimes: form.showTimes.split(",").map((s) => s.trim())
    };

    if (editingId) {
      // ⚡ Update existing movie
      await updateMovie(editingId, payload);
      setEditingId(null);
    } else {
      // ⚡ Add new movie
      await addMovie(payload);
    }

    setForm({
      title: "",
      description: "",
      poster: "",
      genre: "",
      duration: "",
      releaseDate: "",
      showTimes: "",
      price: ""
    });

    fetchMovies();
  };

  const handleEdit = (movie) => {
    // ⚡ Prefill form for editing
    setEditingId(movie._id);
    setForm({
      title: movie.title,
      description: movie.description,
      poster: movie.poster,
      genre: movie.genre,
      duration: movie.duration,
      releaseDate: movie.releaseDate.split("T")[0], // only date
      showTimes: movie.showTimes.join(", "),
      price: movie.price
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top form
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      await deleteMovie(id);
      fetchMovies();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#0b0b0b] text-white p-10 mt-25">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          🎬 Admin <span className="text-pink-500">Dashboard</span>
        </h1>

        {/* ✅ Manage Theatres Link */}
        <div className="text-center mb-8">
          <Link
            to="/admin/theatres"
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            🎭 Manage Theatres
          </Link>
        </div>

        {/* Add / Edit Movie Form */}
        <div className="bg-[#161616] p-8 rounded-xl shadow-xl mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            {editingId ? "✏ Edit Movie" : "➕ Add New Movie"}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:ring-2 focus:ring-pink-500"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />
            <input
              className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:ring-2 focus:ring-pink-500"
              name="genre"
              placeholder="Genre"
              value={form.genre}
              onChange={handleChange}
            />
            <input
              className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:ring-2 focus:ring-pink-500"
              name="poster"
              placeholder="Poster URL"
              value={form.poster}
              onChange={handleChange}
            />
            <input
              className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:ring-2 focus:ring-pink-500"
              name="duration"
              placeholder="Duration (mins)"
              value={form.duration}
              onChange={handleChange}
            />
            <input
              className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:ring-2 focus:ring-pink-500"
              name="releaseDate"
              type="date"
              value={form.releaseDate}
              onChange={handleChange}
            />
            <input
              className="p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:ring-2 focus:ring-pink-500"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
            />
            <input
              className="col-span-2 p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:ring-2 focus:ring-pink-500"
              name="showTimes"
              placeholder="Showtimes (comma separated)"
              value={form.showTimes}
              onChange={handleChange}
            />
            <textarea
              className="col-span-2 p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:ring-2 focus:ring-pink-500"
              rows="3"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="col-span-2 w-full bg-pink-600 hover:bg-pink-700 py-3 rounded-lg font-medium transition duration-300"
            >
              {editingId ? "✅ Update Movie" : "➕ Add Movie"}
            </button>
          </form>
        </div>

        {/* All Movies */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">All Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-[#161616] rounded-xl p-4 shadow-md hover:shadow-lg transition"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="rounded-lg w-full h-48 object-cover mb-3"
                />
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-3">
                  {movie.genre} • {movie.duration} mins
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(movie)} // ⚡ edit button
                    className="bg-blue-600 hover:bg-blue-700 flex-1 py-2 rounded-md font-medium transition duration-300"
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="bg-red-600 hover:bg-red-700 flex-1 py-2 rounded-md font-medium transition duration-300"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;