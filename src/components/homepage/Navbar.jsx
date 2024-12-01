import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow-md">
            {/* Left: Social Media Icons */}
            <div className="flex space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                    <FaInstagram size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                    <FaTwitter size={20} />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                    <FaTiktok size={20} />
                </a>
            </div>

            {/* Right: Buttons */}
            <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-100">
                    Log In
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600">
                    Join the Membership
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
