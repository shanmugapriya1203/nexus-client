import React, { useState, useEffect } from "react";
import socket from "../context/socket";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "flowbite-react";
import { Link } from "react-router-dom";

const EmergencyAlert = () => {
  const [emergencyData, setEmergencyData] = useState(null);

  useEffect(() => {
    socket.on("emergency", (data) => {
      if (data.type === "newIncident") {
        setEmergencyData(data.data);
      }
    });

    return () => {
      socket.off("emergency");
    };
  }, []);

  const handleClose = () => {
    setEmergencyData(null);
  };

  if (!emergencyData) return null;

  return (
    <Modal
      show={true}
      onClose={handleClose}
      size="md"
      popup
      className="my-custom-modal"
    >
      <ModalHeader closebutton>
        <h3>{emergencyData.type}</h3>
      </ModalHeader>
      <ModalBody>
        <div className="space-y-6">
          <p>
            <strong>Location:</strong> {emergencyData.location}
          </p>
          <p>
            <strong>Description:</strong> {emergencyData.description}
          </p>
          <p>
            <strong>Severity:</strong> {emergencyData.severity}
          </p>
          <p>
            <strong>Status:</strong> {emergencyData.status}
          </p>
          <p>
            <strong>Required Responder Types:</strong>{" "}
            {emergencyData.requiredResponderTypes}
          </p>
          <p>
            <strong>Required Responder Quantity:</strong>{" "}
            {emergencyData.requiredResponderQuantity}
          </p>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EmergencyAlert;
