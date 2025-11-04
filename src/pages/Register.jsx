import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth.service";
import profileService from "../appwrite/profile.service";
import {
  ERROR_MESSAGES,
  MIN_PASSWORD_LENGTH,
  SUCCESS_MESSAGES,
} from "../config/constants";
import { login } from "../store/auth.slice";
import { getProfile } from "../store/profile.slice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    // Add basic validation
    if (password !== confirmPassword) {
      toast.error(ERROR_MESSAGES.PASSWORDS_DONT_MATCH);
      return;
    }

    // Password strength validation
    if (password.length < MIN_PASSWORD_LENGTH) {
      toast.error(ERROR_MESSAGES.PASSWORD_TOO_SHORT);
      return;
    }
    try {
      setLoading(true);
      // Handle registration logic
      const user = await authService.createAccount({
        email,
        password,
        name,
      });

      if (!user.error) {
        user.$id = user.userId;
        dispatch(login({ user }));
        const profile = await profileService.getProfile(user?.userId);
        dispatch(getProfile({ profile }));
        toast.success(SUCCESS_MESSAGES.REGISTER_SUCCESS);
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
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              placeholder="Enter your name"
              required
            />
          </div>

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

          <div className="mb-4">
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
              placeholder="Enter your password (min 8 characters)"
              required
              minLength={8}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
              placeholder="Confirm your password"
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
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-purple-500 hover:text-purple-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
