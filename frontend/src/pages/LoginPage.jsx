// pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/user/login", { email, password });

      // Save token or user info if needed
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Login
        </button>
      </form>

      {/* Signup Prompt */}
      <p className="mt-6 text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-green-500 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
