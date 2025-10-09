import api from "./axios";

export const getMovies = () => api.get("/movies");
export const getMovieById = (id) => api.get(/movies/${id});