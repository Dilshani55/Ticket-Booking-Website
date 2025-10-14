import API from "./api";  // your axios instance

// Helper: attach JWT token if available
const authHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("⚠ No auth token found in localStorage");
    return {};
  }
  return {
    headers: { Authorization: Bearer ${token} },
  };
};

// -------- Public Endpoints --------

// Get all movies
export const getMovies = async () => {
  try {
    const { data } = await API.get("/movies");
    return data;
  } catch (err) {
    console.error("❌ Failed to fetch movies:", err.response?.data || err.message);
    throw err;
  }
};

// Get single movie by ID
export const getMovieById = async (id) => {
  try {
    const { data } = await API.get(/movies/${id});
    return data;
  } catch (err) {
    console.error(❌ Failed to fetch movie ${id}:, err.response?.data || err.message);
    throw err;
  }
};

// -------- Admin Endpoints (require token + admin role) --------

// Add Movie
export const addMovie = async (movieData) => {
  try {
    const { data } = await API.post("/movies", movieData, authHeader());
    console.log("✅ Movie added:", data);
    return data;
  } catch (err) {
    console.error("❌ Failed to add movie:", err.response?.data || err.message);
    throw err;
  }
};

// Update Movie
export const updateMovie = async (id, movieData) => {
  try {
    const { data } = await API.put(/movies/${id}, movieData, authHeader());
    console.log("✅ Movie updated:", data);
    return data;
  } catch (err) {
    console.error(❌ Failed to update movie ${id}:, err.response?.data || err.message);
    throw err;
  }
};

// Delete Movie
export const deleteMovie = async (id) => {
  try {
    const { data } = await API.delete(/movies/${id}, authHeader());
    console.log("✅ Movie deleted:", data);
    return data;
  } catch (err) {
    console.error(❌ Failed to delete movie ${id}:, err.response?.data || err.message);
    throw err;
  }
};