import React, { useState, useEffect } from "react";
import { FiCheckCircle, FiList, FiAward } from "react-icons/fi";

const VolunteerDashboard = () => {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  // Sample data for demonstration
  useEffect(() => {
    // Fetch data from backend or set sample data here
    setTotalTasks(10);
    setCompletedTasks(5);
    setTotalPoints(50);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Volunteer Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="dashboard-card bg-blue-500 flex items-center justify-center p-4 rounded-lg cursor-pointer transition duration-300 hover:bg-blue-600 hover:text-white">
          <div className="card-icon mr-2">
            <FiList className="text-white" />
          </div>
          <div className="card-content text-white">
            <h5>Total Tasks</h5>
            <p>{totalTasks}</p>
          </div>
        </div>
        <div className="dashboard-card bg-green-500 flex items-center justify-center p-4 rounded-lg cursor-pointer transition duration-300 hover:bg-green-600 hover:text-white">
          <div className="card-icon mr-2">
            <FiCheckCircle className="text-white" />
          </div>
          <div className="card-content text-white">
            <h5>Completed Tasks</h5>
            <p>{completedTasks}</p>
          </div>
        </div>
        <div className="dashboard-card bg-teal-500 flex items-center justify-center p-4 rounded-lg cursor-pointer transition duration-300 hover:bg-teal-600 hover:text-white">
          <div className="card-icon mr-2">
            <FiAward className="text-white" />
          </div>
          <div className="card-content text-white">
            <h5>Total Points</h5>
            <p>{totalPoints}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
