import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../api/apiservice";
import { Button } from "flowbite-react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import DashSidebar from "../components/DashSidebar";
const GetPlan = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/plans/user/${currentUser.user._id}/emergencyplans`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch plans");
        }
        const data = await response.json();
        setPlans(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, [currentUser.user._id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-center text-green-600">
        Emergency Plans
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : plans.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4">
            The total time to fill out the form is 8 to 16 minutes.
          </p>
          <p className="mb-4">No emergency plans found.</p>
          <Link to="/createplan">
            <Button color="success" className="flex items-center">
              <span>Create New Plan</span>
              <FaPlus className="ml-2" />
            </Button>
          </Link>
        </div>
      ) : (
        plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-green-100 rounded-lg shadow-lg mb-8"
          >
            <div className="p-6 space-y-8 relative">
              <Button
                color="primary"
                className="flex items-center"
                onClick={() => window.history.back()}
              >
                <FaArrowLeft className="mr-2" /> Back
              </Button>
              <h2 className="text-xl font-semibold mb-4 inline-block">
                My Details
              </h2>
              <Link to="/updateplan" className="absolute top-0 right-2">
                <FaEdit />
              </Link>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="font-semibold text-lg">Family Members:</p>
                  <ul className="list-disc list-inside">
                    {plan.familyMembers.map((member) => (
                      <li key={member._id} className="mb-4">
                        <strong>Name:</strong> {member.name},{" "}
                        <strong>Age:</strong> {member.age},{" "}
                        <strong>Gender:</strong> {member.gender},{" "}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Emergency Contacts */}
                <div>
                  <p className="font-semibold text-lg">Emergency Contacts:</p>
                  <ul className="list-disc list-inside">
                    {plan.emergencyContacts.map((contact) => (
                      <li key={contact._id} className="mb-4">
                        <strong>Name:</strong> {contact.name},{" "}
                        <strong>Phone:</strong> {contact.phone},{" "}
                        <strong>Relationship:</strong> {contact.relationship},{" "}
                        <strong>Email:</strong> {contact.email}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Evacuation Plan */}
              <div>
                <p className="font-semibold text-lg">Evacuation Plan:</p>
                <p>
                  <strong>Type:</strong> {plan.evacuationPlan.type}
                </p>
                <p>
                  <strong>Evacuation Routes:</strong>{" "}
                  {plan.evacuationPlan.evacuationRoutes.join(", ")}
                </p>
                <p>
                  <strong>Meeting Points:</strong>{" "}
                  {plan.evacuationPlan.meetingPoints.join(", ")}
                </p>
              </div>
              {/* Medical Information */}
              <div>
                <p className="font-semibold text-lg">Medical Information:</p>
                <p>
                  <strong>Type:</strong> {plan.medicalInformation.type}
                </p>
                <p>
                  <strong>Allergies:</strong>{" "}
                  {plan.medicalInformation.allergies.join(", ")}
                </p>
                <p>
                  <strong>Medications:</strong>{" "}
                  {plan.medicalInformation.medications.join(", ")}
                </p>
                <p>
                  <strong>Medical Conditions:</strong>{" "}
                  {plan.medicalInformation.medicalConditions.join(", ")}
                </p>
              </div>
              {/* Notes */}
              <div>
                <p className="font-semibold text-lg">Notes:</p>
                <p>{plan.notes}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GetPlan;
