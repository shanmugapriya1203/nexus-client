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

  const handleSignout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("Error:", data.message);
      } else {
        console.log("Sign-out successful:", data);
        dispatch(signoutSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative">
      <button className="md:hidden p-2 text-gray-700" onClick={toggleSidebar}>
        {isSidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>
      <Sidebar
        className={`w-full md:w-56 fixed md:static top-0 left-0 h-full z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "w-4/5 md:w-56" : "w-56"
        } md:w-56 bg-white`}
      >
        <div className="flex justify-between items-center p-4 md:hidden">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={toggleSidebar}>
            <HiX size={24} />
          </button>
        </div>
        <Sidebar.Items>
          <Sidebar.ItemGroup className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Link to="/dashboard?tab=profile" className="flex-grow">
                <Sidebar.Item
                  active={activeTab === "profile"}
                  icon={HiUser}
                  as="div"
                >
                  Profile
                </Sidebar.Item>
              </Link>
            </div>
            <Link to="/alerts">
              <Sidebar.Item icon={HiDocumentText}>Alerts</Sidebar.Item>
            </Link>
            <Link to="/dashboard?tab=shelters">
              <Sidebar.Item
                active={activeTab === "shelters"}
                icon={HiOutlineAnnotation}
              >
                Shelters
              </Sidebar.Item>
            </Link>
            {currentUser.user.role !== "admin" && (
              <Link to="/plans">
                <Sidebar.Item icon={HiArrowSmRight}>Plans</Sidebar.Item>
              </Link>
            )}
            <Link to="/emergencies">
              <Sidebar.Item icon={HiOutlineAnnotation}>
                Emergencies
              </Sidebar.Item>
            </Link>
            <Link to="/community">
              <Sidebar.Item icon={HiOutlineAnnotation}>Community</Sidebar.Item>
            </Link>
            <Sidebar.ItemGroup title="Donate" className="flex flex-col gap-1">
              <Link to="/donatemoney">
                <Sidebar.Item icon={HiCash}>Donate Money</Sidebar.Item>
              </Link>
              <Link to="/donatesupplies">
                <Sidebar.Item icon={HiGift}>Donate Supplies</Sidebar.Item>
              </Link>
              <Link to="/tasks">
                <Sidebar.Item icon={HiHeart}>Volunteer</Sidebar.Item>
              </Link>
            </Sidebar.ItemGroup>
            <Sidebar.Item
              icon={HiArrowSmRight}
              className="cursor-pointer"
              onClick={handleSignout}
            >
              Sign Out
            </Sidebar.Item>
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
