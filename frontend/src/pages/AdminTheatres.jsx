import { useState, useEffect } from "react";
import { getTheatres, addTheatre } from "../api/theatreApi";

function AdminTheatres() {
  const [theatres, setTheatres] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    screens: "",
    contact: "",
    poster: "" 
  });

  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = async () => {
    try {
      const data = await getTheatres();
      setTheatres(data);
    } catch (err) {
      console.error("Failed to fetch theatres:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Simple validation for poster
    if (form.poster && !form.poster.startsWith("http")) {
      alert("❌ Poster URL must be a valid image link (http/https).");
      return;
    }

    try {
      await addTheatre({
        name: form.name,
        location: form.location,
        screens: Number(form.screens),
        contact: form.contact,
        poster: form.poster
      });
      setForm({ name: "", location: "", screens: "", contact: "", poster: "" });
      fetchTheatres();
      alert("✅ Theatre added successfully!");
    } catch (err) {
      alert("❌ Failed to add theatre");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 px-25 mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">
        🎭 Admin – Manage <span className="text-pink-500">Theatres</span>
      </h1>

      {/* Add Theatre Form */}
      <div className="bg-[#161616] p-6 rounded-xl mb-10">
        <h2 className="text-xl font-semibold mb-4">Add New Theatre</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Theatre Name"
            className="p-3 rounded bg-[#1f1f1f] border border-gray-700"
            required
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="p-3 rounded bg-[#1f1f1f] border border-gray-700"
            required
          />
          <input
            name="screens"
            value={form.screens}
            onChange={handleChange}
            placeholder="Screens"
            type="number"
            className="p-3 rounded bg-[#1f1f1f] border border-gray-700"
          />
          <input
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Contact"
            className="p-3 rounded bg-[#1f1f1f] border border-gray-700"
          />
          <input
            name="poster"
            value={form.poster}
            onChange={handleChange}
            placeholder="Poster Image URL (https://...)"
            className="col-span-2 p-3 rounded bg-[#1f1f1f] border border-gray-700"
          />

          <button
            type="submit"
            className="col-span-2 bg-pink-600 hover:bg-pink-700 py-3 rounded-lg font-semibold"
          >
            ➕ Add Theatre
          </button>
        </form>
      </div>

      {/* List Theatres */}
      <h2 className="text-2xl font-semibold mb-4">All Theatres</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {theatres.map((t) => (
          <div key={t._id} className="bg-[#161616] p-4 rounded-lg shadow-md">
            {/* ✅ Show Poster with fallback */}
            <img
              src={
                t.poster && t.poster.trim() !== ""
                  ? t.poster
                  : "https://via.placeholder.com/400x200?text=No+Poster"
              }
              alt={t.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-bold">{t.name}</h3>
            <p className="text-gray-400">📍 {t.location}</p>
            <p className="text-gray-400">🎬 Screens: {t.screens}</p>
            <p className="text-gray-400">📞 {t.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTheatres;