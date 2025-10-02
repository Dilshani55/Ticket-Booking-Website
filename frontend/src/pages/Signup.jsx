import { useState, useContext } from "react";
import { signup as signupService } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default user

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await signupService({ name, email, password, role });
    login(data);

    if (data.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/home"); // or "/movies"
    }
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#0b0b0b] text-white mt-10">
      <div className="w-full max-w-md bg-[#161616] rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          <span className="text-pink-500">Zone</span>Show
        </h1>
        <h2 className="text-xl font-semibold text-center mb-6">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] border border-gray-700 
              focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] border border-gray-700 
              focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] border border-gray-700 
              focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>

          {/* Role select */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1f1f1f] border border-gray-700 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 font-medium py-3 rounded-lg transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-pink-500 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;