import { useState, useContext } from "react";
import { login as loginService } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const location = useLocation();
  console.log("Current location:", location.pathname);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginService({ email, password });

      // Save to auth context (this will also set localStorage inside context)
      login(data);

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#0b0b0b] text-white">
      {/* Card container */}
      <div className="w-full max-w-md bg-[#161616] rounded-xl shadow-xl p-8">
        {/* Logo */}
        <h1 className="text-3xl font-bold text-center mb-6">
          <span className="text-pink-500">Zone</span>Show
        </h1>

        <h2 className="text-xl font-semibold text-center mb-6">
          Log in to your account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 font-medium py-3 rounded-lg transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-pink-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;