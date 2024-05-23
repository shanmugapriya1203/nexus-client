import React from "react";
import DashSidebar from "../components/DashSidebar";
import { Outlet } from "react-router-dom";

const HeroPage = () => {
  return (
    <div className="flex ">
      <div className="sticky  z-10 h-screen top-10 ">
        <DashSidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default HeroPage;
