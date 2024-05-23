import DashSidebar from "../components/DashSidebar";
import { Outlet } from "react-router-dom";

const HeroPage = () => {
  return (
    <div className="md:flex">
      <div className="md:w-64">
        <div className="md:fixed">
          <DashSidebar />
        </div>
      </div>
      <div className="md:flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default HeroPage;
