import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../api/apiservice";
import { Table, Modal, Button } from "flowbite-react";
import { Link } from "react-router-dom";

const AllVolunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Volunteers</h2>
      <Table hoverable className="shadow-md">
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>City</Table.HeadCell>
          <Table.HeadCell>Profession</Table.HeadCell>
          <Table.HeadCell>Availability</Table.HeadCell>
          <Table.HeadCell>Assigned Tasks</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {volunteers.map((volunteer) => (
            <Table.Row key={volunteer._id} className="hover:bg-gray-100">
              <Table.Cell className="bg-gray-50 dark:bg-gray-700 font-bold">
                {volunteer.fullName.toUpperCase()}
              </Table.Cell>
              <Table.Cell className="bg-gray-50 dark:bg-gray-700">
                {volunteer.email}
              </Table.Cell>
              <Table.Cell className="bg-gray-50 dark:bg-gray-700">
                {volunteer.city}
              </Table.Cell>
              <Table.Cell className="bg-gray-50 dark:bg-gray-700">
                {volunteer.profession}
              </Table.Cell>
              <Table.Cell className="bg-gray-50 dark:bg-gray-700">
                {volunteer.availabilityDropdown.toUpperCase()}
              </Table.Cell>
              <Table.Cell className="bg-gray-50 dark:bg-gray-700">
                {volunteer.assignedTasks.length > 0 &&
                volunteer.assignedTasks[0].status !== "completed" ? (
                  <Button color="success">Assigned</Button>
                ) : (
                  <Link to={`/admin/assign-task/${volunteer._id}`}>
                    <Button color="dark">Assign</Button>
                  </Link>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
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
