import React, { useState, useEffect } from "react";
import {
  FiCheckCircle,
  FiList,
  FiAward,
  FiAlertCircle,
  FiPhone,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { BASE_URL } from "../api/apiservice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip, ProgressBar } from "react-bootstrap";

const VolunteerDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [emergencyAlerts, setEmergencyAlerts] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (currentUser && currentUser.user && currentUser.user.assignedTasks) {
          const taskIds = currentUser.user.assignedTasks;
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
        setEmergencyAlerts(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching alerts:", error);
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

    fetchTasks();
    fetchAlerts();
    fetchDonations();
  }, [currentUser]);

  useEffect(() => {
    setTotalPoints(50);
    setRecentActivities([
      "Delivered supplies to shelter",
      "Assisted in evacuation",
      "Conducted first aid training",
    ]);
    setUpcomingEvents([
      "Training session on 2024-06-01",
      "Community drill on 2024-06-15",
    ]);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="flex items-center justify-between p-4 bg-gray-200 text-gray-800 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Volunteer Dashboard</h1>
        <div className="flex items-center">
          <FaUserCircle className="text-3xl mr-2" />
          <span>Welcome, {currentUser.user.fullName}!</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="dashboard-card bg-blue-600 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
          <FiList className="text-white text-4xl" />
          <div className="text-right">
            <h5 className="text-white text-lg">Total Tasks</h5>
            <p className="text-white text-2xl font-bold">{totalTasks}</p>
          </div>
        </div>
        <div className="dashboard-card bg-green-600 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
          <FiCheckCircle className="text-white text-4xl" />
          <div className="text-right">
            <h5 className="text-white text-lg">Completed Tasks</h5>
            <p className="text-white text-2xl font-bold">{completedTasks}</p>
          </div>
        </div>
        <div className="dashboard-card bg-teal-600 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
          <FiAward className="text-white text-4xl" />
          <div className="text-right">
            <h5 className="text-white text-lg">Total Points</h5>
            <p className="text-white text-2xl font-bold">{totalPoints}</p>
          </div>
        </div>
        <div className="dashboard-card bg-yellow-600 p-6 rounded-lg shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
          <FiAlertCircle className="text-white text-4xl" />
          <div className="text-right">
            <h5 className="text-white text-lg">Emergency Alerts</h5>
            <p className="text-white text-2xl font-bold">
              {emergencyAlerts.length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Link
          to="/alerts"
          className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Emergency Alerts
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
        <div className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Critical Contacts
          </h3>
          <ul className="list-disc pl-5 text-gray-800">
            <li className="mb-1 flex items-center">
              <FiPhone className="inline mr-2 text-blue-600" />
              Emergency Coordinator: <a href="tel:1234567890">(123) 456-7890</a>
            </li>
            <li className="mb-1 flex items-center">
              <FiPhone className="inline mr-2 text-blue-600" />
              Local Shelter: <a href="tel:0987654321">(098) 765-4321</a>
            </li>
            <li className="mb-1 flex items-center">
              <FiPhone className="inline mr-2 text-blue-600" />
              Red Cross: <a href="tel:9876543210">(987) 654-3210</a>
            </li>
            <li className="mb-1 flex items-center">
              <FiPhone className="inline mr-2 text-blue-600" />
              Fire Department: <a href="tel:5551234567">(555) 123-4567</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Recent Activities
          </h3>
          <ul className="list-disc pl-5 text-gray-800">
            {recentActivities.map((activity, index) => (
              <li key={index} className="mb-1">
                {activity}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Upcoming Events
          </h3>
          <ul className="list-disc pl-5 text-gray-800">
            {upcomingEvents.map((event, index) => (
              <li key={index} className="mb-1">
                {event}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Link
          to="/community"
          className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Ask Your Questions
          </h3>
          <div>
            <h4 className="text-lg font-semibold text-gray-800">
              What should I do during an earthquake?
            </h4>
            <p className="text-gray-700">
              Stay indoors and take cover under sturdy furniture or against an
              inside wall. Avoid windows.
            </p>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                How can I prepare for a hurricane?
              </h4>
              <p className="text-gray-700">
                Create an emergency kit, have a family evacuation plan, and stay
                informed about weather updates.
              </p>
            </div>
          </div>
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Donations
          </h3>
          <ul className="list-disc pl-5 text-gray-800">
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
      <div className="bg-white p-6 rounded-lg shadow-md hover:bg-gray-100 transition-colors">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Progress</h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-800">Tasks Completed</span>
          <span className="text-gray-800 font-bold">
            {completedTasks} out of {totalTasks}
          </span>
        </div>
        <ProgressBar now={(completedTasks / totalTasks) * 100} />
      </div>
    </div>
  );
};

export default VolunteerDashboard;
