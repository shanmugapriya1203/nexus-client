import React, { useState, useEffect } from "react";
import { BASE_URL } from "../api/apiservice";
import { Modal, Button, Pagination } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaEnvelope,
  FaCity,
  FaBriefcase,
  FaClock,
} from "react-icons/fa";

const AllVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [volunteersPerPage] = useState(6);
  const currentUser = useSelector((state) => state.user.currentUser);

  const isLead = currentUser && currentUser.user.role === "lead";
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/volunteers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setVolunteers(data);
        } else {
          console.error("Failed to fetch volunteers:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching volunteers:", error.message);
      }
    };

    fetchVolunteers();
  }, []);

  // Get current volunteers
  const indexOfLastVolunteer = currentPage * volunteersPerPage;
  const indexOfFirstVolunteer = indexOfLastVolunteer - volunteersPerPage;
  const currentVolunteers = volunteers.slice(
    indexOfFirstVolunteer,
    indexOfLastVolunteer
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <Button
        color="primary"
        className="flex items-center mb-4"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft className="mr-2" /> Back
      </Button>

      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        All Volunteers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentVolunteers.map((volunteer) => (
          <div
            key={volunteer._id}
            className="bg-white rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {volunteer.fullName}
              </h3>
              <div className="text-md text-gray-600 mb-3 flex items-center">
                <FaEnvelope className="mr-2 text-blue-500" />
                <span>
                  <strong>Email:</strong> {volunteer.email}
                </span>
              </div>
              <div className="text-md text-gray-600 mb-3 flex items-center">
                <FaCity className="mr-2 text-red-500" />
                <span>
                  <strong>City:</strong> {volunteer.city}
                </span>
              </div>
              <div className="text-md text-gray-600 mb-3 flex items-center">
                <FaBriefcase className="mr-2 text-green-500" />
                <span>
                  <strong>Profession:</strong> {volunteer.profession}
                </span>
              </div>
              <div className="text-md text-gray-600 mb-3 flex items-center">
                <FaClock className="mr-2 text-purple-500" />
                <span>
                  <strong>Availability:</strong>{" "}
                  {volunteer.availabilityDropdown}
                </span>
              </div>
              {isLead && (
                <div className="text-md text-gray-600 mb-3 flex items-center">
                  <strong>Assigned Tasks:</strong>{" "}
                  {volunteer.assignedTasks.length > 0 &&
                  volunteer.assignedTasks[0].status !== "completed" ? (
                    <Button color="success" size="xs">
                      Assigned
                    </Button>
                  ) : (
                    <Link to={`/admin/assign-task/${volunteer._id}`}>
                      <Button color="dark" size="xs" className="m-2">
                        Assign
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(volunteers.length / volunteersPerPage)}
          onPageChange={paginate}
        />
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
      </Modal>
    </div>
  );
};

export default AllVolunteers;
