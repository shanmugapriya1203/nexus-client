import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Logo from '/Nexus.png';

const Header = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const renderSignupButton = () => {
    if (currentUser) {
      return (
        <div className="relative">
          <button onClick={toggleDropdown} className="text-green-800">
            <FaUserCircle className="text-2xl" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
              <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
              <Link to="/signout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Sign Out</Link>
            </div>
          )}
        </div>
      );
    } else if (location.pathname === '/signup') {
      return (
        <Link to="/login" className="bg-green-400 text-green-800 py-2 px-4 rounded-lg hover:bg-green-300 transition-colors">Sign In</Link>
      );
    } else {
      return (
        <Link to="/signup" className="bg-green-400 text-green-800 py-2 px-4 rounded-lg hover:bg-green-300 transition-colors">Sign Up</Link>
      );
    }
  };

  return (
    <header className="text-gray-800 p-4 flex items-center justify-between sticky top-0 bg-white z-10 shadow-md">
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-10 mr-2" />
      </div>
      <nav className="space-x-4  items-center hidden lg:flex">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/alerts" className="hover:text-gray-400">Alerts</Link>
        <Link to="/maps" className="hover:text-gray-400">Maps</Link>
      </nav>
      <div className="flex items-center gap-2 lg:gap-4">
        {renderSignupButton()}
      </div>
    </header>
  );
};

export default Header;