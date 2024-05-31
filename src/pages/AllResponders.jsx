import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useLocation } from "react-router-dom";
import { BASE_URL } from "../api/apiservice";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const ResponderCard = ({ responder, incidentLocation }) => {
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

  return (
    <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl">
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
      </div>
    </div>
  );
};

const AllResponders = () => {
  const [responders, setResponders] = useState([]);
  const { incidentId } = useParams();
  const [incidentLocation, setIncidentLocation] = useState("");
  const location = useLocation();

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

    fetchResponders();
  }, []);

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
          />
        ))}
      </div>
    </div>
  );
};

export default AllResponders;
