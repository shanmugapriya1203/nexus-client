import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Modal, Button, TextInput } from "flowbite-react";

import { BASE_URL } from "../api/apiservice";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUser,
  FaWhatsapp,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const ResponderCard = ({
  responder,
  incidentLocation,
  onDeleteClick,
  onEditClick,
}) => {
  const locationText =
    responder.location === incidentLocation ? (
      <span className="text-red-500">Same Location</span>
    ) : (
      responder.location
    );

  const sendWhatsAppMessage = () => {
    const formattedNumber = responder.mobileNumber.startsWith("+91")
      ? responder.mobileNumber
      : `+91${responder.mobileNumber}`;
    const message = `Are you available at ${incidentLocation} for emergency?`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${formattedNumber}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink);
  };

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-white rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {responder.name}
        </h2>
        <div className="text-md text-gray-600 mb-3 flex items-center">
          <FaPhone className="mr-2 text-blue-500" />
          <span>
            <strong>Mobile:</strong> {responder.mobileNumber}
          </span>
        </div>
        <div className="text-md text-gray-600 mb-3 flex items-center">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          <span>
            <strong>Location:</strong> {locationText}
          </span>
        </div>
        <div className="text-md text-gray-600 mb-3 flex items-center">
          <FaBriefcase className="mr-2 text-green-500" />
          <span>
            <strong>Profession:</strong>{" "}
            {capitalizeFirstLetter(responder.profession)}
          </span>
        </div>
        <div className="text-md text-gray-600 flex items-center">
          <FaUser className="mr-2 text-purple-500" />
          <span>
            <strong>Referred By:</strong>{" "}
            {responder.createdBy ? responder.createdBy.username : "Unknown"}
          </span>
        </div>
        {incidentLocation && (
          <div
            className="text-md text-gray-600 flex items-center mt-4 cursor-pointer"
            onClick={sendWhatsAppMessage}
          >
            <FaWhatsapp className="mr-2 text-green-500" />
            <span>Send WhatsApp Message</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex space-x-2">
          {currentUser && currentUser.user._id === responder.createdBy._id && (
            <>
              <FaEdit
                className="text-gray-500 cursor-pointer"
                onClick={() => onEditClick(responder)}
              />
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => onDeleteClick(responder._id)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const AllResponders = () => {
  const [responders, setResponders] = useState([]);
  const [incidentLocation, setIncidentLocation] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteResponderId, setDeleteResponderId] = useState(null);
  const [editResponder, setEditResponder] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    mobileNumber: "",
    location: "",
    profession: "",
  });
  const { incidentId } = useParams();
  const currentUser = useSelector((state) => state.user.currentUser);

  const fetchResponders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/responder/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch responders");
      }
      const data = await response.json();
      setResponders(data);
    } catch (error) {
      toast.error("Error fetching responders");
    }
  };

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/incident/${incidentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch incident");
        }
        const { location } = await response.json();
        setIncidentLocation(location);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIncident();
  }, [incidentId]);

  useEffect(() => {
    fetchResponders();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteResponderId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteResponderId) return;

    try {
      const response = await fetch(
        `${BASE_URL}/api/responder/${deleteResponderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete responder");
      }
      setShowDeleteModal(false);
      fetchResponders();
      toast.success("Responder deleted successfully");
    } catch (error) {
      toast.error("Error deleting responder");
    }
  };

  const handleEditClick = (responder) => {
    setEditResponder(responder);
    setEditForm({
      name: responder.name,
      mobileNumber: responder.mobileNumber,
      location: responder.location,
      profession: responder.profession,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/responder/${editResponder._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(editForm),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update responder");
      }
      setShowEditModal(false);
      fetchResponders();
      toast.success("Responder updated successfully");
    } catch (error) {
      toast.error("Error updating responder");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        All Responders
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {responders.map((responder) => (
          <ResponderCard
            key={responder._id}
            responder={responder}
            incidentLocation={incidentLocation}
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
          />
        ))}
      </div>

      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this responder?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {editResponder && (
        <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
          <Modal.Header>Edit Responder</Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <TextInput
                  name="name"
                  type="text"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mobile Number
                </label>
                <TextInput
                  name="mobileNumber"
                  type="text"
                  value={editForm.mobileNumber}
                  onChange={handleEditChange}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Location
                </label>
                <TextInput
                  name="location"
                  type="text"
                  value={editForm.location}
                  onChange={handleEditChange}
                  className="w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Profession
                </label>
                <TextInput
                  name="profession"
                  type="text"
                  value={editForm.profession}
                  onChange={handleEditChange}
                  className="w-full"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button color="gray" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button color="blue" onClick={handleEditSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AllResponders;
