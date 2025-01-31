import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";

import { useAuth } from "../../hooks/AuthContext";


import { FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoggedIn, logout } = useAuth();


  const handleLogout = () => {
    // localStorage.removeItem('token');
    // localStorage.clear();
    // setIsLoggedIn(false);
    setIsMenuOpen(false)
    logout();
    navigate('/')
    // console.log('User logged out');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white w-full fixed z-[1000] shadow-lg">
      {/* Left: Social Media Icons */}
      <div className="hidden sm:flex space-x-4">
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
      { isLoggedIn ? 
         <div title="logout" className="hidden sm:flex space-x-2 hover:cursor-pointer">
         <IoLogOut className="my-auto" size={24} onClick={handleLogout}/>
 
       </div>
       :
      <div className="hidden sm:flex space-x-2">
      <Link
        title="login"
        to="/login"
        className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
      >
        로그인  {/*Log In*/}
      </Link>
      <Link
        title="sign up"
        to="/signup"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        회원가입 {/*Join the Membership*/}
      </Link>
      </div>
      
      }
  
        
      {/* Hamburger Menu (visible on small screens only) */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-600 hover:text-blue-500"
        >
          {isMenuOpen ? <HiX size={28}/> : <HiMenu size={28} />} 
        </button>
        {/* Dropdown menu (toggle visibility) */}
        {isMenuOpen && (
          isLoggedIn ?
          <div className="absolute right-0 top-16 z-[100] flex flex-col gap-4 bg-white shadow-lg rounded p-4">
          <IoLogOut className="my-auto" size={24} onClick={handleLogout}/>
          </div>
          :
          <div className="absolute right-0 top-16 z-[100] flex flex-col gap-4 bg-white shadow-lg rounded p-4">
            <Link
              to="/login"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              로그인
              {/* Log In */}
            </Link>
            <Link
              to="/signup"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded text-white bg-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              회원가입
              {/* Join the Membership */}
            </Link>
            
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
