// backend/src/models/Theatre.js
import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    screens: { type: Number, required: true },
    contact: { type: String },
    poster: { type: String },
    movies: [
      {
        movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
        showTimes: [String], // ["10:00 AM", "1:30 PM", ...]
      },
    ],
  },
  { timestamps: true }
);

const Theatre = mongoose.model("Theatre", theatreSchema);
export default Theatre;