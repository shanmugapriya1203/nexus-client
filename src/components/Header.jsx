import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../context/SocketContext";
import { toast } from "react-toastify";
import Logo from "/Nexus.png";
import { signoutSuccess } from "../redux/userSlice";
import { BASE_URL } from "../api/apiservice";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isNewTaskClicked, setIsNewTaskClicked] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (socket) {
      socket.on("newAlert", () => {
        toast.info("New alert received");
      });
    }

    return () => {
      if (socket) {
        socket.off("newAlert");
      }
    };
  }, [socket]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNewTaskClick = () => {
    setIsNewTaskClicked(true);
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Error:", data.message);
      } else {
        dispatch(signoutSuccess());
        setShowDropdown(!showDropdown);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const renderSignupButton = () => {
    if (currentUser) {
      const isVolunteerWithAssignedTasks =
        currentUser.user.role === "volunteer" &&
        currentUser.user.assignedTasks &&
        currentUser.user.assignedTasks.length > 0;

      const isEmergencyResponderWithAssignedIncidents =
        currentUser.user.role === "emergencyresponder" &&
        currentUser.user.assignedIncidents &&
        currentUser.user.assignedIncidents.length > 0;

      return (
        <div className="fixed md:relative">
          <button
            onClick={toggleDropdown}
            className="text-green-800 relative focus:outline-none"
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            <img
              src={currentUser.user.profilePicture}
              alt="User Avatar"
              className="w-8 h-8 rounded-full mt-1"
            />
            {(isVolunteerWithAssignedTasks ||
              isEmergencyResponderWithAssignedIncidents) &&
              !isNewTaskClicked && (
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
              )}
          </button>
          {showDropdown && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10"
              role="menu"
            >
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={toggleDropdown}
                role="menuitem"
              >
                Profile
              </Link>
              <span
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                onClick={handleSignout}
                role="menuitem"
              >
                Sign Out
              </span>
              {(isVolunteerWithAssignedTasks ||
                isEmergencyResponderWithAssignedIncidents) && (
                <Link
                  to={
                    currentUser.user.role === "volunteer"
                      ? "/tasks"
                      : "/incidents"
                  }
                  onClick={handleNewTaskClick}
                  className="block px-4 py-2 text-red-500 hover:bg-gray-200"
                  role="menuitem"
                >
                  {currentUser.user.role === "volunteer"
                    ? currentUser.user.assignedTasks.length
                    : currentUser.user.assignedIncidents.length}{" "}
                  New{" "}
                  {currentUser.user.role === "volunteer" ? "Task" : "Incident"}
                  {currentUser.user.role === "volunteer"
                    ? currentUser.user.assignedTasks.length > 1
                      ? "s"
                      : ""
                    : currentUser.user.assignedIncidents.length > 1
                    ? "s"
                    : ""}
                </Link>
              )}
            </div>
          )}
        </div>
      );
    } else {
      if (location.pathname === "/signup") {
        return (
          <Link
            to="/login"
            className="bg-green-400 text-green-800 py-2 px-4 rounded-lg hover:bg-green-300 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign In
          </Link>
        );
      } else {
        return (
          <Link
            to="/signup"
            className="bg-green-400 text-green-800 py-2 px-4 rounded-lg hover:bg-green-300 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </Link>
        );
      }
    }
  };

  return (
    <>
      <header className="text-gray-800 p-4 flex flex-wrap justify-between items-center sticky top-0 bg-white z-10 shadow-md">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-10 mr-2" />
        </div>
        <nav className="hidden md:flex md:items-center md:w-auto w-full">
          <Link
            to="/"
            className="block lg:inline-block hover:text-gray-400 font-bold px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block lg:inline-block hover:text-gray-400 font-bold px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            About
          </Link>
          {currentUser && (
            <Link
              to="/dashboard"
              className="block lg:inline-block hover:text-gray-400 font-bold px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2 lg:gap-4">
          {renderSignupButton()}
          <button
            className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <MdMenu />
          </button>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="flex flex-col text-center absolute w-full top-[75px] z-10 bg-gray-300">
          <Link
            to="/"
            className="block lg:inline-block hover:text-gray-400 font-bold px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={toggleMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block lg:inline-block hover:text-gray-400 font-bold px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={toggleMobileMenu}
          >
            About
          </Link>

          {currentUser && (
            <Link
              to="/dashboard"
              className="block lg:inline-block hover:text-gray-400 font-bold px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={toggleMobileMenu}
            >
              Dashboard
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
