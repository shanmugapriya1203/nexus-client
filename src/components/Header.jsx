import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext"; // Import SocketContext
import { toast } from "react-toastify";
import Logo from "/Nexus.png";

const Header = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNewTaskClicked, setIsNewTaskClicked] = useState(false);
  const socket = useContext(SocketContext); // Access SocketContext

  useEffect(() => {
    if (socket) {
      // Listen for new alerts and display toast notifications
      socket.on("newAlert", () => {
        toast.info("New alert received!");
      });
    }

    return () => {
      if (socket) {
        // Clean up socket listener
        socket.off("newAlert");
      }
    };
  }, [socket]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNewTaskClick = () => {
    setIsNewTaskClicked(true);
  };

  const renderSignupButton = () => {
    const hasAssignedTasks =
      currentUser &&
      currentUser.user.assignedTasks &&
      currentUser.user.assignedTasks.length > 0;
    const newTaskCount = hasAssignedTasks
      ? currentUser.user.assignedTasks.length
      : 0;

    if (currentUser) {
      return (
        <div className="relative">
          <button onClick={toggleDropdown} className="text-green-800 relative">
            <FaUserCircle className="text-2xl" />
            {hasAssignedTasks && !isNewTaskClicked && (
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
            )}
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Profile
              </Link>
              <Link
                to="/signout"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Sign Out
              </Link>
              {hasAssignedTasks && (
                <Link
                  to="/tasks"
                  onClick={handleNewTaskClick}
                  className="block px-4 py-2 text-red-500 hover:bg-gray-200"
                >
                  {newTaskCount} New Task{newTaskCount > 1 && "s"}
                </Link>
              )}
            </div>
          )}
        </div>
      );
    } else if (location.pathname === "/signup") {
      return (
        <Link
          to="/login"
          className="bg-green-400 text-green-800 py-2 px-4 rounded-lg hover:bg-green-300 transition-colors"
        >
          Sign In
        </Link>
      );
    } else {
      return (
        <Link
          to="/signup"
          className="bg-green-400 text-green-800 py-2 px-4 rounded-lg hover:bg-green-300 transition-colors"
        >
          Sign Up
        </Link>
      );
    }
  };

  return (
    <header className="text-gray-800 p-4 flex flex-wrap justify-between items-center sticky top-0 bg-white z-10 shadow-md">
      <div className="flex items-center flex-shrink-0">
        <img src={Logo} alt="Logo" className="h-10 mr-2" />
      </div>
      <nav className="space-x-4  items-center hidden lg:flex flex-grow">
        <Link to="/" className="hover:text-gray-400">
          Home
        </Link>
        <Link to="/alerts" className="hover:text-gray-400">
          Alerts
        </Link>
        <Link to="/maps" className="hover:text-gray-400">
          Maps
        </Link>
      </nav>
      <div className="flex items-center gap-2 lg:gap-4">
        {renderSignupButton()}
      </div>
    </header>
  );
};

export default Header;
