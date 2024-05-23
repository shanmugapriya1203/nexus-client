import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminDashboard from "../components/AdminDashboard";
import { useLocation } from "react-router-dom";
import GetPlan from "../components/Plans/GetPlan";
import VolunteerDashBoard from "../components/VolunteerComponent/VolunteerDashBoard";
import EmergencyDashBoard from "../components/Emergency/EmergencyDashBoard";
import UserDashboard from "./NormalUserDash";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mx-auto">
        {tab === "plans" && <GetPlan />}

        {currentUser.user.role === "admin" && (!tab || tab === "/") && (
          <AdminDashboard />
        )}
        {currentUser.user.role === "volunteer" && (!tab || tab === "/") && (
          <VolunteerDashBoard />
        )}
        {currentUser.user.role === "emergencyresponder" &&
          (!tab || tab === "/") && <EmergencyDashBoard />}
        {currentUser.user.role === "user" && (!tab || tab === "/") && (
          <UserDashboard />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
