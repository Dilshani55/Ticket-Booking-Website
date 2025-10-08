import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full px-30 py-4 flex items-center justify-between z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-red-500 font-extrabold text-4xl">Z</span>
        <h1 className="text-white text-3xl font-bold">oneShow</h1>
      </div>

      {/* Center Navigation Pills */}
      <nav className="bg-white/10 backdrop-blur-md rounded-full px-8 py-2 flex gap-6 text-white font-medium shadow-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-red-600 transition ${
              isActive ? "text-white-400" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            `hover:text-red-600 transition ${
              isActive ? "text-white-400" : ""
            }`
          }
        >
          Movies
        </NavLink>
        <NavLink
          to="/theatres"
          className={({ isActive }) =>
            `hover:text-red-600 transition ${
              isActive ? "text-white-400" : ""
            }`
          }
        >
          Theatres
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `hover:text-red-600 transition ${
              isActive ? "text-white-400" : ""
            }`
          }
        >
          Profile
        </NavLink>
      </nav>

      {/* Right Side: Search + Login */}
      <div className="flex items-center gap-4">
        {/* Search Icon */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 mr-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1116.65 2.5 7.5 7.5 0 0116.65 16.65z"
            />
          </svg>
        </button>

        {/* Login Button */}
        <Link
          to="/login"
          className="bg-pink-600 hover:bg-red-700 transition text-white px-6 py-2 rounded-full font-medium"
        >
          Log In
        </Link>
      </div>
    </header>
  );
}

export default Navbar;