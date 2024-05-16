import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import your Button component

const AdminDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.user.role === "admin";
  const totalVolunteers = 100;
  const totalShelters = 20;
  const totalEmergencyResponders = 50;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {isAdmin && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Manage Shelters</h3>
              <Link
                to="/add-shelter"
                className="text-blue-500 hover:text-blue-700"
              >
                Create New Shelter
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Manage Tasks</h3>
              <Link
                to="/admin/tasks"
                className="text-blue-500 hover:text-blue-700"
              >
                View All Tasks
              </Link>
            </div>

            {/* Manage Volunteers */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Manage Volunteers</h3>
              <Link
                to="/admin/volunteers"
                className="text-blue-500 hover:text-blue-700"
              >
                View All Volunteers
              </Link>
            </div>

            {/* Emergency Updates */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Emergency Updates</h3>
              <Link
                to="/admin/emergency/create"
                className="text-blue-500 hover:text-blue-700"
              >
                Create New Emergency Update
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">System Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <h4 className="text-lg font-semibold mb-2">Volunteers</h4>
                <p>Total: {totalVolunteers}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-4">
                <h4 className="text-lg font-semibold mb-2">Shelters</h4>
                <p>Total: {totalShelters}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h4 className="text-lg font-semibold mb-2">
                  Emergency Responders
                </h4>
                <p>Total: {totalEmergencyResponders}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
