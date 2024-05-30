import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/apiservice";
import { FaShare } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft } from "react-icons/fa";

const HomeShelter = () => {
  const { shelterId } = useParams();
  const [shelterData, setShelterData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShelterData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/shelter/${shelterId}`);
        if (res.ok) {
          const data = await res.json();
          setShelterData(data);
        } else {
          setError("Failed to fetch shelter data");
        }
      } catch (error) {
        setError("Error fetching shelter data");
      }
    };

    fetchShelterData();
  }, [shelterId]);

  const shareShelter = () => {
    const deepLink = `${window.location.origin}/shelter/${shelterId}`;
    if (navigator.share) {
      navigator.share({
        title: "Check out this shelter",
        text: "I found this shelter and thought you might be interested.",
        url: deepLink,
      });
    } else {
      alert(`Shareable URL: ${deepLink}`);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="relative">
      <div className="absolute top-0 right-0 mt-4 mr-4 flex items-center space-x-2">
        <span className="text-sm text-gray-600">Share</span>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={shareShelter}
        >
          <FaShare size={18} />
        </button>
      </div>
      <div className="container mx-auto px-4 py-8">
        <ToastContainer />
        <div className="mb-4">
          <button
            className="flex items-center text-gray-600 hover:text-gray-800"
            onClick={() => navigate("/")}
          >
            <FaArrowLeft className="mr-2" />
          </button>
        </div>
        {shelterData ? (
          <div className=" rounded-lg shadow-md p-8 relative">
            <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
              {shelterData.name}
            </h1>

            <div className="flex flex-wrap items-start mb-8">
              <div className="w-full md:w-1/2 mb-4 md:mb-0">
                <img
                  src={shelterData.photos[0]}
                  alt="Main Photo"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="flex flex-wrap w-full md:w-1/2 md:pl-4">
                {shelterData.photos.slice(1, 5).map((photo, index) => (
                  <div
                    key={index}
                    className="w-1/2 mb-4 p-1 transition-transform transform hover:scale-105"
                  >
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-gray-700 mb-6">
              <p className="mb-4">
                <span className="font-semibold">Location:</span>{" "}
                {shelterData.location}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Description:</span>{" "}
                {shelterData.description}
              </p>
            </div>

            <div className="border-t border-gray-300 pt-6">
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Contact:</span>{" "}
                {shelterData.contact.email}, {shelterData.contact.phone}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Capacity:</span>{" "}
                {shelterData.capacity}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Availability:</span>{" "}
                {shelterData.availability ? "Available" : "Unavailable"}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Map</h2>
              <iframe
                src={shelterData.mapUrl}
                width="100%"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                title="Shelter Map"
              ></iframe>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default HomeShelter;
