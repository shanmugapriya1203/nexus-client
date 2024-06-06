import React, { useState, useEffect } from "react";
import { Button, TextInput } from "flowbite-react";
import { HiOutlinePlus, HiOutlineSearch } from "react-icons/hi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { BASE_URL } from "../api/apiservice";
import EmergencyList from "./EmergencyList";
import EmergencyModal from "../components/Emergency/EmergencyModal";
import DeleteModal from "../components/Emergency/DeleteModal";

const EmergencyPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newIncident, setNewIncident] = useState({
    type: "",
    location: "",
    description: "",
    severity: "Low",
    status: "Open",
    requiredResponderTypes: ["paramedic", "nurse", "doctor"],
    requiredResponderQuantity: 3,
  });
  const [incidentToDelete, setIncidentToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/incident/`);
      if (!response.ok) {
        throw new Error("Failed to fetch incidents");
      }
      const data = await response.json();
      setIncidents(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchIncidentsByLocation = async (location) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/incident/incidents?location=${encodeURIComponent(
          location
        )}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch incidents by location");
      }
      const data = await response.json();
      setIncidents(data.incidents);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchLocation.trim() !== "") {
      fetchIncidentsByLocation(searchLocation);
    } else {
      fetchIncidents();
    }
  }, [searchLocation]);

  const handleReadMore = (incident) => {
    setSelectedIncident(incident);
    setModalType("readMore");
    setShowModal(true);
  };

  const handleAddIncident = () => {
    setModalType("addIncident");
    setNewIncident({
      type: "",
      location: "",
      description: "",
      severity: "Low",
      status: "Open",
      requiredResponderTypes: ["paramedic", "nurse", "doctor"],
      requiredResponderQuantity: 3,
    });
    setShowModal(true);
  };

  const handleEditIncident = (incident) => {
    setSelectedIncident(incident);
    setNewIncident({
      type: incident.type,
      location: incident.location,
      description: incident.description,
      severity: incident.severity,
      status: incident.status,
      requiredResponderTypes: incident.requiredResponderTypes,
      requiredResponderQuantity: incident.requiredResponderQuantity,
    });
    setModalType("editIncident");
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchLocation(e.target.value);
  };

  const handleIncidentChange = (e) => {
    const { name, value } = e.target;
    setNewIncident((prevIncident) => ({
      ...prevIncident,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/incident/${currentUser.user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newIncident),
        }
      );

      if (response.ok) {
        toast.success("Incident created successfully");
        setShowModal(false);
        fetchIncidents();
      } else {
        toast.error("Failed to create incident");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create incident");
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/incident/${selectedIncident._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newIncident),
        }
      );

      if (response.ok) {
        toast.success("Incident updated successfully");
        setShowModal(false);
        fetchIncidents();
      } else {
        toast.error("Failed to update incident");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update incident");
    }
  };

  const handleDelete = (incident) => {
    setIncidentToDelete(incident);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/incident/${incidentToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Incident deleted successfully");
        setIncidentToDelete(null);
        setShowDeleteModal(false);
        fetchIncidents();
      } else {
        toast.error("Failed to delete incident");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete incident");
    }
  };

  return (
    <div className="flex-grow p-8">
      <h1 className="text-2xl font-semibold mb-4">Emergencies</h1>
      <div className="mb-4">
        <p>
          "In times of crisis, the character of a community is revealed.
          Together, we face the challenges, support each other, and emerge
          stronger."
        </p>
      </div>

      <div className="mb-2" style={{ maxWidth: "300px" }}>
        <div className="relative">
          <TextInput
            id="small"
            type="text"
            sizing="sm"
            placeholder="Search by location"
            value={searchLocation}
            onChange={handleSearchChange}
          />
          <HiOutlineSearch
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => fetchIncidentsByLocation(searchLocation)}
          />
        </div>
      </div>

      {(currentUser.user.role === "lead" ||
        currentUser.user.role === "admin" ||
        currentUser.user.role === "volunteer") && (
        <div className="flex justify-end mb-2">
          <Button
            className="bg-green-500  text-white font-bold py-1 px-1 rounded"
            onClick={handleAddIncident}
          >
            <HiOutlinePlus className="mr-2" />
            Add
          </Button>
        </div>
      )}

      <EmergencyList
        incidents={incidents}
        handleReadMore={handleReadMore}
        handleEditIncident={handleEditIncident}
        handleDelete={handleDelete}
        currentUser={currentUser}
      />

      <EmergencyModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalType={modalType}
        selectedIncident={selectedIncident}
        newIncident={newIncident}
        handleChange={handleIncidentChange}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
        currentUser={currentUser}
      />

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        confirmDelete={confirmDelete}
      />
    </div>
  );
};

export default EmergencyPage;
