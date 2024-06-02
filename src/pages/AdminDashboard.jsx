import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FiCheckCircle,
  FiList,
  FiAward,
  FiAlertCircle,
  FiPhone,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { BASE_URL } from "../api/apiservice";

const AdminDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.user.role === "admin";
  const isLead = currentUser && currentUser.user.role === "lead";
  const totalVolunteers = 100;
  const totalShelters = 20;
  const totalEmergencyResponders = 50;

  const [totalTasks, setTotalTasks] = useState(0);
  const [totalUsers, setTotalUsers] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [alertsWithoutSlice, setAlertsWithoutSlice] = useState(0);
  const [shelters, setShelters] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (
          currentUser &&
          currentUser.user &&
          currentUser.user.assignedIncidents
        ) {
          const taskIds = currentUser.user.assignedIncidents;
          const promises = taskIds.map((taskId) =>
            fetch(`${BASE_URL}/api/volunteers/task/${taskId}`).then((res) =>
              res.json()
            )
          );
          const tasks = await Promise.all(promises);

          setTotalTasks(tasks.length);
          const completedTaskCount = tasks.filter(
            (task) => task.status === "completed"
          ).length;
          setCompletedTasks(completedTaskCount);
          setTotalPoints(completedTaskCount * 10);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchAlerts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/alerts`);
        const data = await response.json();
        setAlertsWithoutSlice(data.length);
        setEmergencyAlerts(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user/getall`);
        const data = await response.json();
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    const fetchEmergencies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/incident/`);
        const data = await response.json();
        setRecentActivities(data);
      } catch (error) {
        console.error("Error fetching emergencies:", error);
      }
    };

    const fetchDonations = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/donations`);
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    const fetchShelters = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/shelter/`);
        if (res.ok) {
          const data = await res.json();
          setShelters(data);
        } else {
          console.error("Failed to fetch shelters:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching shelters:", error.message);
      }
    };
    fetchTasks();
    fetchAlerts();
    fetchEmergencies();
    fetchDonations();
    fetchShelters();
    fetchUsers();
  }, [currentUser]);

  useEffect(() => {
    setTotalPoints(50);
    setRecentActivities([
      { description: "Delivered supplies to shelter" },
      { description: "Assisted in evacuation" },
      { description: "Conducted first aid training" },
    ]);
    setUpcomingEvents([
      { event: "Training session on 2024-06-01" },
      { event: "Community drill on 2024-06-15" },
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {(isAdmin || isLead) && (
        <div>
          <div className="flex items-center mb-6">
            <FaUserCircle className="text-4xl mr-2 text-blue-500" />
            <h2 className="text-2xl font-semibold text-gray-700">
              Welcome, {currentUser.user.fullName}!
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {isAdmin && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-2">Manage Shelters</h3>
                <Link
                  to="/add-shelter"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Create New Shelter
                </Link>
              </div>
            )}
            {isLead && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold mb-2">
                  Manage Responders
                </h3>
                <Link
                  to="/allresponders"
                  className="text-blue-500 hover:text-blue-700"
                >
                  View All Responders
                </Link>
              </div>
            )}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Manage Tasks</h3>
              <Link
                to="/admin/tasks"
                className="text-blue-500 hover:text-blue-700"
              >
                View All Tasks
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Manage Volunteers</h3>
              <Link
                to="/volunteers"
                className="text-blue-500 hover:text-blue-700"
              >
                View All Volunteers
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold mb-2">Emergency Updates</h3>
              <Link
                to="/emergencies"
                className="text-blue-500 hover:text-blue-700"
              >
                Create New Emergency Update
              </Link>
            </div>
          </div>
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="dashboard-card bg-blue-500 p-4 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105">
                <FiList className="text-white text-3xl mr-4" />
                <div>
                  <h5 className="text-white text-lg">Total Shelters</h5>
                  <p className="text-white text-xl font-bold">
                    {shelters.length}
                  </p>
                </div>
              </div>
              <div className="dashboard-card bg-green-500 p-4 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105">
                <FiCheckCircle className="text-white text-3xl mr-4" />
                <div>
                  <h5 className="text-white text-lg">Total Emergencies</h5>
                  <p className="text-white text-xl font-bold">
                    {recentActivities.length}
                  </p>
                </div>
              </div>
              <div className="dashboard-card bg-teal-500 p-4 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105">
                <FiAward className="text-white text-3xl mr-4" />
                <div>
                  <h5 className="text-white text-lg">Total Users</h5>
                  <p className="text-white text-xl font-bold">{totalUsers}</p>
                </div>
              </div>
              <div className="dashboard-card bg-yellow-500 p-4 rounded-lg shadow-md flex items-center transition-transform transform hover:scale-105">
                <FiAlertCircle className="text-white text-3xl mr-4" />
                <div>
                  <h5 className="text-white text-lg">Alerts</h5>
                  <p className="text-white text-xl font-bold">
                    {alertsWithoutSlice}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <Link to="/alerts" className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  Recent Alerts
                </h3>
                <ul className="list-disc pl-5 text-red-600">
                  {emergencyAlerts.map((alert) => (
                    <li key={alert._id} className="mb-1 flex items-center">
                      <FiAlertCircle className="inline mr-2" />
                      {alert.message}
                    </li>
                  ))}
                </ul>
              </Link>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  Critical Contacts
                </h3>
                <ul className="list-disc pl-5 text-gray-700">
                  <li className="mb-1 flex items-center">
                    <FiPhone className="inline mr-2 text-blue-500" />
                    Emergency Coordinator: (123) 456-7890
                  </li>
                  <li className="mb-1 flex items-center">
                    <FiPhone className="inline mr-2 text-blue-500" />
                    Local Shelter: (098) 765-4321
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  Recent Activities
                </h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {recentActivities.map((activity, index) => (
                    <li key={index} className="mb-1">
                      {activity.description}{" "}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  Upcoming Events
                </h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {upcomingEvents.map((event, index) => (
                    <li key={index} className="mb-1">
                      {event.event}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <Link to="/community">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Ask Your Questions
                  </h3>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      What should I do during an earthquake?
                    </h4>
                    <p className="text-gray-700">
                      Stay indoors and take cover under sturdy furniture or
                      against an inside wall. Avoid windows.
                    </p>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-800">
                      How can I prepare for a hurricane?
                    </h4>
                    <p className="text-gray-700">
                      Create an emergency kit, have a family evacuation plan,
                      and stay informed about weather updates.
                    </p>
                  </div>
                </div>
              </Link>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-gray-700">
                  Donations
                </h3>
                <ul className="list-disc pl-5 text-gray-700">
                  {donations.map((donation) => (
                    <li key={donation._id} className="mb-1">
                      <strong>Type:</strong> {donation.type} <br />
                      <strong>Quantity:</strong> {donation.quantity} <br />
                      <strong>Description:</strong> {donation.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center p-4 bg-red-100 rounded-lg shadow-md">
              <FiPhone className="text-red-500 text-3xl mr-4" />
              <p className="text-red-700 text-lg">
                In case of emergency, contact your supervisor immediately!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
