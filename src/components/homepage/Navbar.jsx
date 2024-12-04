import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Left: Social Media Icons */}
      <div className="flex space-x-4">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-500"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-500"
        >
          <FaTwitter size={20} />
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-500"
        >
          <FaTiktok size={20} />
        </a>
      </div>

      {/* Center: Logo */}
      <div>
        <Link
          to="/"
          className="text-2xl font-bold text-blue-500 hover:text-blue-600"
        >
          RMD
        </Link>
      </div>

      {/* Right: Buttons */}
      <div className="flex space-x-2 hidden sm:shown">
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Join the Membership
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
