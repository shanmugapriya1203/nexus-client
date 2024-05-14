import React from "react";
import { useSelector } from "react-redux";
import DashSidebar from "../components/DashSidebar";
import UpdateProfile from "./UpdatePage";
import DashShelters from "../components/DashShelters";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParms = new URLSearchParams(location.search);
    const tabFormUrl = urlParms.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="">
          <DashSidebar />
        </div>
        <div className="mx-auto">
          {tab === "profile" && <UpdateProfile />}
          {tab === "shelters" && <DashShelters />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
