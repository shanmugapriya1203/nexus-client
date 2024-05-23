import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DashSidebar from "../DashSidebar";
import { BASE_URL } from "../../api/apiservice";
import { Button, Modal } from "flowbite-react";

const ShowEmergencies = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);
  const assignedTasks = currentUser.user?.assignedIncidents || [];

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const incidentPromises = assignedTasks.map((taskId) =>
          fetch(`${BASE_URL}/api/incident/${taskId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => (res.ok ? res.json() : Promise.reject(res)))
        );

        const incidentsData = await Promise.all(incidentPromises);
        setIncidents(incidentsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };

    fetchIncidents();
  }, [assignedTasks]);

  const handleCompleteIncident = (incidentId) => {
    setSelectedIncidentId(incidentId);
    setShowModal(true);
  };

  const handleConfirmCompletion = async (confirmed) => {
    if (confirmed && selectedIncidentId) {
      try {
        const res = await fetch(
          `${BASE_URL}/api/incident/${selectedIncidentId}/status`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "Closed" }),
          }
        );
        if (res.ok) {
          await fetchIncidents();
          setCompleted(true);
          setShowModal(false);
        } else {
          console.error("Failed to complete incident:", res.statusText);
        }
      } catch (error) {
        console.error("Error completing incident:", error.message);
      }
    } else {
      setShowModal(false);
    }
  };

  const fetchIncidents = async () => {
    try {
      const incidentPromises = assignedTasks.map((taskId) =>
        fetch(`${BASE_URL}/api/incident/${taskId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => (res.ok ? res.json() : Promise.reject(res)))
      );

      return await Promise.all(incidentPromises);
    } catch (error) {
      console.error("Error fetching incidents:", error);
      return [];
    }
  };

  return (
    <>
      <div className="flex-grow p-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-500 ">
            Assigned Emergencies
          </h1>
        </div>
        {loading ? (
          <p>Loading incident details...</p>
        ) : (
          <div className="mt-10">
            {incidents.map((incident) => (
              <div
                key={incident._id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col mb-4 mt-2"
              >
                <h1 className="text-3xl font-bold mb-4">{incident.type}</h1>
                <p className="mb-2">Description: {incident.description}</p>
                <p
                  className={`mb-2 text-${
                    incident.status === "Open" ? "red" : "green"
                  }-500`}
                >
                  Status: {incident.status.toUpperCase()}
                </p>
                <p className="mb-2">Location: {incident.location}</p>
                <p className="mb-2">Severity: {incident.severity}</p>

                <p className="mb-2">
                  Required Responder Types:{" "}
                  {incident.requiredResponderTypes.join(", ")}
                </p>
                <p className="mb-2">
                  Required Responder Quantity:{" "}
                  {incident.requiredResponderQuantity}
                </p>
                <p className="mb-2">
                  Created At: {new Date(incident.createdAt).toLocaleString()}
                </p>

                <div className="mt-auto">
                  {incident.status === "Closed" ? (
                    <Button color="success">Completed</Button>
                  ) : (
                    <Button
                      gradientMonochrome="success"
                      onClick={() => handleCompleteIncident(incident._id)}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header>Complete Incident</Modal.Header>
        <Modal.Body>
          Are you sure you want to mark this incident as completed?
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={() => handleConfirmCompletion(true)}>
            Yes
          </Button>
          <Button color="danger" onClick={() => handleConfirmCompletion(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowEmergencies;
