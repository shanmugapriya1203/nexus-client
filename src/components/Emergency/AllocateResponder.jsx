import React, { useState, useEffect } from "react";
import DashSidebar from "../DashSidebar";
import { BASE_URL } from "../../api/apiservice";
import ResponderTable from "./ResponderTable";

const AllocateResponder = () => {
  const [responders, setResponders] = useState([]);
  const [incidentId, setIncidentId] = useState(null);

  useEffect(() => {
    fetchData();
    const url = window.location.href;
    const idIndex = url.lastIndexOf("/");
    const extractedId = idIndex !== -1 ? url.substring(idIndex + 1) : null;
    setIncidentId(extractedId);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/incident/responders`);
      const data = await response.json();
      setResponders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAllocate = async (responderId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/incident/${incidentId}/assign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ responderId }),
        }
      );

      if (response.ok) {
        console.log("Incident assigned to responder successfully");
        console.error(
          "Failed to assign incident to responder:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error assigning incident to responder:", error.message);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="">
        <DashSidebar />
      </div>
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-semibold mb-4">Allocate Responder</h1>
        <ResponderTable
          responders={responders}
          handleAllocate={handleAllocate}
        />
      </div>
    </div>
  );
};

export default AllocateResponder;
