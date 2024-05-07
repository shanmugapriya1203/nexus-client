import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Logo from '/Nexus.png';

const Header = () => {
  const location = useLocation();

  const renderSignupButton = () => {
    if (location.pathname === '/signup') {
      return (
        <Link to="/signin" className="bg-green-400 text-green-800 py-2 px-4 rounded-lg hover:bg-green-300 transition-colors">Sign In</Link>
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
      <div className="flex items-center gap-2">
        {renderSignupButton()}
        <FaUserCircle className="text-2xl" />
      </div>
    </header>
  );
};

export default Header;
