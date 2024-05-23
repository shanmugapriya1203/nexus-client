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
const UserDashboard = () => {
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
      <div className="flex items-center mb-6">
        <FaUserCircle className="text-4xl mr-2 text-blue-500" />
        <h2 className="text-2xl font-semibold text-gray-700">
          Welcome, {currentUser.user.fullName}!
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Link to="/alerts" className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">
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
                {activity}
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
                {event}
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
                Stay indoors and take cover under sturdy furniture or against an
                inside wall. Avoid windows.
              </p>
            </div>
            <div className="mt-4">
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
    </div>
  );
};

export default UserDashboard;
