import React from "react";
import { Card, Button } from "flowbite-react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

const EmergencyList = ({
  incidents,
  handleReadMore,
  handleEditIncident,
  handleDelete,
  currentUser,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {incidents.map((incident) => (
        <Card key={incident._id} className="max-w-sm relative">
          <div className="absolute top-0 right-0 flex">
            {currentUser.user._id === incident.createdBy && (
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => handleEditIncident(incident)}
              >
                <HiOutlinePencilAlt color="blue" />
              </button>
            )}
            {currentUser.user.role === "admin" && (
              <button
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => handleDelete(incident)}
              >
                <HiOutlineTrash color="red" />
              </button>
            )}
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {incident.type}
          </h5>
          <p
            className={`font-normal text-gray-700 dark:text-gray-400 ${
              incident.severity === "High" ? "text-red-600" : "text-green-600"
            }`}
          >
            <strong>Location:</strong> {incident.location}
            <br />
            <strong>Description:</strong> {incident.description}
            <br />
            <strong>Severity:</strong> {incident.severity}
            <br />
            <strong>Status:</strong> {incident.status}
          </p>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleReadMore(incident)}
          >
            Read more
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default EmergencyList;
