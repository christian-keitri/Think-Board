// pages/SignupPage.jsx
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: frontend validation before hitting backend
    if (!formData.name || !formData.email || formData.password.length < 6) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    console.log("Submitting:", formData);

    try {
      const res = await axios.post("/api/v1/user/signup", formData);

      // Save token to localStorage
      localStorage.setItem("token", res.data.token);

      toast.success("Account created successfully!");

      // Clear form and redirect
      setFormData({ name: "", email: "", password: "" });
      navigate("/login");
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (Array.isArray(errors)) {
        errors.forEach((e) => toast.error(`${e.param}: ${e.msg}`));
      } else {
        toast.error(err.response?.data?.message || "Signup failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Create an Account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="p-3 rounded bg-gray-800 text-white border border-gray-600"
          required
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </form>

      {/* Login Prompt */}
      <p className="mt-6 text-sm text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="text-green-400 hover:underline">
          Log in here
        </a>
      </p>
    </div>
  );
};

export default SignupPage;
