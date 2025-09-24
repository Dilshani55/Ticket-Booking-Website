import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  poster: String,  
  genre: String,
  duration: Number, 
  releaseDate: Date,
  showTimes: [String], 
  price: { type: Number, default: 500 }, 
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;