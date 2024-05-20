import React, { useState, useEffect } from "react";
import { Sidebar, SidebarItem } from "flowbite-react";
import {
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineAnnotation,
  HiUser,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../api/apiservice";

const DashSidebar = () => {
  const [activeTab, setActiveTab] = useState("");
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

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={activeTab === "profile"}
              icon={HiUser}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=alerts">
            <Sidebar.Item
              active={activeTab === "alerts"}
              icon={HiDocumentText}
              as="div"
            >
              Alerts
            </Sidebar.Item>
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
            <Sidebar.Item icon={HiOutlineAnnotation}>Emergencies</Sidebar.Item>
          </Link>
          <Link to="/community">
            <Sidebar.Item icon={HiOutlineAnnotation}>Community</Sidebar.Item>
          </Link>
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
  );
};

export default DashSidebar;
