import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../api/apiservice";
import { Button, Table, Modal } from "flowbite-react";
import { FaArrowLeft } from "react-icons/fa";
const AssignTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [volunteerId, setVolunteerId] = useState(null);
  const [volunteerArea, setVolunteerArea] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [fullname, setFullname] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchVolunteerDetails = async (volunteerId) => {
      try {
        const res = await fetch(`${BASE_URL}/api/user/get/${volunteerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setVolunteerArea(data.area);
          setFullname(data.fullName);
        } else {
          console.error("Failed to fetch volunteer details:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching volunteer details:", error.message);
      }
    };
    const url = window.location.href;
    const idIndex = url.lastIndexOf("/");
    const extractedId = idIndex !== -1 ? url.substring(idIndex + 1) : null;
    setVolunteerId(extractedId);
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/volunteers/tasks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setTasks(data.tasks);
          setLoading(false);
        } else {
          console.error("Failed to fetch tasks:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    if (extractedId) {
      fetchVolunteerDetails(extractedId);
    }

    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/volunteers/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks);
        setLoading(false);
      } else {
        console.error("Failed to fetch tasks:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const handleAssignClick = (task) => {
    setSelectedTask(task);
    setShowConfirmationModal(true);
  };

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const handleConfirmAssign = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/volunteers/tasks/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          taskId: selectedTask._id,
          volunteerId: volunteerId,
        }),
      });
      if (res.ok) {
        console.log("Task assigned successfully");
        setShowSuccessModal(true);
        fetchTasks();
      } else {
        console.error("Failed to assign task:", res.statusText);
      }
    } catch (error) {
      console.error("Error assigning task:", error.message);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  return (
    <div>
      <Button
        color="primary"
        className="flex items-center mb-4"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft className="mr-2" /> Back
      </Button>
      <h2 className="text-2xl font-bold mb-10 text-center mt-5">Assign Task</h2>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Assign</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {tasks.map((task) => (
                <Table.Row key={task._id} className="hover:bg-gray-100">
                  <Table.Cell className="bg-gray-50 dark:bg-gray-700 font-bold">
                    {task.name}
                  </Table.Cell>
                  <Table.Cell>{task.description}</Table.Cell>
                  {task.area === volunteerArea ? (
                    <Table.Cell style={{ color: "red" }}>
                      Same Location
                    </Table.Cell>
                  ) : (
                    <Table.Cell>{task.area}</Table.Cell>
                  )}
                  <Table.Cell>
                    {task.assignedVolunteer ? (
                      <Button className="dark" disabled>
                        Assigned
                      </Button>
                    ) : (
                      <Button
                        className="dark"
                        onClick={() => handleAssignClick(task)}
                      >
                        Assign
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Modal
            show={showConfirmationModal}
            onClose={() => setShowConfirmationModal(false)}
            popup
          >
            <Modal.Header>Confirmation</Modal.Header>
            <Modal.Body>
              Are you sure you want to assign task "{selectedTask?.name}" to{" "}
              {fullname}?
            </Modal.Body>
            <Modal.Footer>
              <Button color="success" onClick={handleConfirmAssign}>
                Yes
              </Button>
              <Button
                color="danger"
                onClick={() => setShowConfirmationModal(false)}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            popup
          >
            <Modal.Header>Success</Modal.Header>
            <Modal.Body>Task assigned successfully!</Modal.Body>
            <Modal.Footer>
              <Button
                color="success"
                onClick={() => {
                  setShowSuccessModal(false);
                  fetchTasks(); // Refresh tasks after success
                }}
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AssignTask;
