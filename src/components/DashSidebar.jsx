import React, { useState, useEffect } from "react";
import { Sidebar, SidebarItem } from "flowbite-react";
import {
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineAnnotation,
  HiUser,
  HiHeart,
  HiCash,
  HiGift,
  HiX,
  HiMenu,
} from "react-icons/hi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../api/apiservice";

const DashSidebar = () => {
  const [activeTab, setActiveTab] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative h-full">
      <button className="md:hidden p-2 text-gray-700" onClick={toggleSidebar}>
        {isSidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>
      <Sidebar
        className={`w-full md:w-56 fixed top-0 left-0 h-full z-50 bg-white md:static md:h-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "w-4/5 md:w-56" : "w-56"
        }`}
      >
        <div className="flex justify-between items-center p-4 md:hidden">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={toggleSidebar}>
            <HiX size={24} />
          </button>
        </div>
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col ">
            <div className="flex items-center justify-between">
              <Link to="/profile" className="flex-grow" onClick={toggleSidebar}>
                <Sidebar.Item
                  active={activeTab === "profile"}
                  icon={HiUser}
                  as="div"
                >
                  Profile
                </Sidebar.Item>
              </Link>
            </div>
            <Link to="/alerts" onClick={toggleSidebar}>
              <Sidebar.Item icon={HiDocumentText}>Alerts</Sidebar.Item>
            </Link>
            <Link to="/shelters" onClick={toggleSidebar}>
              <Sidebar.Item
                active={activeTab === "shelters"}
                icon={HiOutlineAnnotation}
              >
                Shelters
              </Sidebar.Item>
            </Link>

            <Link to="/plans" onClick={toggleSidebar}>
              <Sidebar.Item icon={HiArrowSmRight}>Plans</Sidebar.Item>
            </Link>

            <Link to="/emergencies" onClick={toggleSidebar}>
              <Sidebar.Item icon={HiOutlineAnnotation}>
                Emergencies
              </Sidebar.Item>
            </Link>
            <Link to="/community" onClick={toggleSidebar}>
              <Sidebar.Item icon={HiOutlineAnnotation}>Community</Sidebar.Item>
            </Link>
            <Sidebar.ItemGroup title="Donate" className="flex flex-col gap-1">
              <Link to="/donatemoney" onClick={toggleSidebar}>
                <Sidebar.Item icon={HiCash}>Donate Money</Sidebar.Item>
              </Link>
              <Link to="/donatesupplies" onClick={toggleSidebar}>
                <Sidebar.Item icon={HiGift}>Donate Supplies</Sidebar.Item>
              </Link>
              {currentUser.user.role === "volunteer" && (
                <Link to="/tasks" onClick={toggleSidebar}>
                  <Sidebar.Item icon={HiHeart}>Volunteer</Sidebar.Item>
                </Link>
              )}
              {currentUser.user.role === "emergencyresponder" && (
                <Link to="/incidents" onClick={toggleSidebar}>
                  <Sidebar.Item icon={HiOutlineAnnotation}>
                    Emergencies
                  </Sidebar.Item>
                </Link>
              )}
              {currentUser.user.role === "user" && (
                <Link to="/contribute" onClick={toggleSidebar}>
                  <Sidebar.Item icon={FaHandHoldingHeart}>
                    Contribute
                  </Sidebar.Item>
                </Link>
              )}
            </Sidebar.ItemGroup>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default DashSidebar;
