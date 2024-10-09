// Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth.service";
import { login } from "../store/auth.slice";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {

        
      setLoading(true);
      const user = await authService.login({email, password});

      if (!user.error) {
        dispatch(login({ user }));
        toast.success("Account created successfully");
        navigate("/profile-details");
      } else {
        toast.error(user.error);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
          toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={
              "w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition" +
              (loading ? " opacity-50 cursor-not-allowed" : "")
            }
            disabled={loading}
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-500 hover:text-purple-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
