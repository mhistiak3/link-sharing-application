import { BsLink } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuLink } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth.service";
import { logout } from "../store/auth.slice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    // Handle logout logic
    await authService.logout();
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="w-full md:max-w-7xl mx-auto bg-white flex justify-between items-center py-3 px-5 rounded-lg shadow-md relative">
      {/* Logo and Title */}
      <Link to="/profile-details" className="flex gap-2 items-center">
        <BsLink className="text-3xl bg-purple-800 text-white p-1 rounded" />
        <span className="font-bold text-lg text-gray-800">DevLinks</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        <NavLink
          to={"/create-link"}
          className={({ isActive }) =>
            `flex gap-2 hover:bg-purple-100 px-5 py-2 rounded-md items-center transition-colors hover:text-purple-800 font-medium ${
              isActive ? "bg-purple-100 text-purple-800" : "text-gray-600"
            }`
          }
        >
          <LuLink className="text-lg" />
          <span>Links</span>
        </NavLink>
        <NavLink
          to={"/profile-details"}
          className={({ isActive }) =>
            `flex gap-2 hover:bg-purple-100 px-5 py-2 rounded-md items-center transition-colors hover:text-purple-800 font-medium ${
              isActive ? "bg-purple-100 text-purple-800" : "text-gray-600"
            }`
          }
        >
          <CgProfile className="text-lg" />
          <span>Profile Details</span>
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-2xl text-gray-600">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg px-5 py-4">
          <NavLink
            to={"/create-link"}
            className={({ isActive }) =>
              `flex gap-2 hover:bg-purple-100 px-4 py-2 rounded-md items-center transition-colors hover:text-purple-800 font-medium mb-3 ${
                isActive ? "bg-purple-100 text-purple-800" : "text-gray-600"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <LuLink className="text-lg" />
            <span>Links</span>
          </NavLink>
          <NavLink
            to={"/profile-details"}
            className={({ isActive }) =>
              `flex gap-2 hover:bg-purple-100 px-4 py-2 rounded-md items-center transition-colors hover:text-purple-800 font-medium mb-3 ${
                isActive ? "bg-purple-100 text-purple-800" : "text-gray-600"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <CgProfile className="text-lg" />
            <span>Profile Details</span>
          </NavLink>
          <Link
            to={"/login"}
            className="border-2 border-purple-500 text-purple-500 px-5 py-2 font-medium rounded hover:bg-purple-500 hover:text-white transition"
            onClick={() => setIsOpen(false)}
          >
            <span>Preview</span>
          </Link>
          <button
            title="logout"
            className="text-2xl font-bold text-red-500 hover:text-red-600 transition ms-3 mt-3 "
            onClick={() => handleLogout()}
          >
            <AiOutlineLogout />
          </button>
        </div>
      )}

      <div className="hidden md:flex gap-3 items-center">
        <Link
          to={"/login"}
          className="border-2 border-purple-500 text-purple-500 px-5 py-2 font-medium rounded hover:bg-purple-500 hover:text-white transition"
        >
          <span>Preview</span>
        </Link>
        <button
          title="logout"
          className="text-2xl font-bold text-red-500 hover:text-red-600 transition"
          onClick={() => handleLogout()}
        >
          <AiOutlineLogout />
        </button>
      </div>
    </div>
  );
};

export default Header;
