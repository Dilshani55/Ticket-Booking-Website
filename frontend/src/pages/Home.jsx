import { useEffect, useState } from "react";
import { getMovies } from "../api/movieApi";
import "../index.css";
import { Link } from "react-router-dom";
import NowShowing from "../components/NowShowing";

// 🎞 Define trailers here
const trailers = [
  {
    id: 1,
    title: "Avatar: Fire and Ash (2025)",
    thumbnail: "https://www.star1063.com.au/wp-content/uploads/sites/18/2025/07/20250729-avatar3-feature.jpg",
    videoUrl: "https://www.youtube.com/embed/nb_fFj_0rq8"
  },
  {
    id: 2,
    title: "Guardians of the Galaxy Vol. 3",
    thumbnail: "https://img.youtube.com/vi/u3V5KDHRQvk/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/u3V5KDHRQvk"
  },
  {
    id: 3,
    title: "The Batman",
    thumbnail: "https://img.youtube.com/vi/mqqft2x_Aa4/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/mqqft2x_Aa4"
  }
];

function Home() {
  const [movies, setMovies] = useState([]);
  const [activeTrailer, setActiveTrailer] = useState(trailers[0]); // ✅ default first trailer

  useEffect(() => {
    getMovies().then(({ data }) => setMovies(data));
  }, []);

  return (
    <div className="bg-[#0b0b0b] text-white font-sans">
      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center"
        style={{
          backgroundImage: "url('https://cdn.wallpapersafari.com/29/23/z4Kt0L.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl px-30 mt-30">
          <img
            src="https://www.freepnglogos.com/uploads/marvel-logo-png/marvel-kyln-disney-wiki-fandom-powered-wikia-21.png"
            alt="Marvel Studios"
            className="w-40 mb-4"
          />
          <h1 className="text-7xl font-medium mb-3">
            Guardians <br />of the Galaxy
          </h1>
          <p className="text-gray-300 mb-2 font-semibold">
            Action | Adventure | Sci-Fi | 2018 • 2h 8m
          </p>
          <p className="text-gray-300 mb-6 font-medium">
            In a post-apocalyptic world where cities ride on wheels and <br />
            consume each other to survive, two people meet in London and <br />
            try to stop a conspiracy.
          </p>
          <Link to="/movies">
            <button className="bg-pink-600 px-6 py-3 text-md rounded-full font-medium hover:bg-pink-700 transition-all cursor-pointer">
              Explore Movies →
            </button>
          </Link>
        </div>
      </section>

      {/* Now Showing */}
      <NowShowing />

      {/* Trailers */}
      <section className="px-8 py-12">
        <h2 className="text-2xl font-semibold mb-6">🎬 Latest Trailers</h2>

        {/* Main Trailer Video */}
        <div className="relative mb-6">
          <iframe
            width="100%"
            height="500"
            src={activeTrailer.videoUrl}
            title={activeTrailer.title}
            className="rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Trailer Thumbnails */}
        <div className="flex gap-6 overflow-x-auto pb-4">
          {trailers.map((t) => (
            <div
              key={t.id}
              onClick={() => setActiveTrailer(t)}
              className={`cursor-pointer rounded-lg overflow-hidden border-2 ${
                activeTrailer.id === t.id ? "border-pink-600" : "border-transparent"
              }`}
            >
              <img src={t.thumbnail} alt={t.title} className="w-48 h-28 object-cover" />
              <p className="text-center text-sm mt-2 text-gray-300">{t.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;