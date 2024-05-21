import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "flowbite-react";
import { BASE_URL } from "../../api/apiservice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import { FaArrowLeft } from "react-icons/fa";
const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
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
        toast.success("Task deleted successfully!"); // Toast notification after deleting task
      } else {
        console.error("Failed to fetch tasks:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/volunteers/tasks/${selectedTask._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.ok) {
        console.log("Task deleted successfully");
        fetchTasks();
      } else {
        console.error("Failed to delete task:", res.statusText);
        toast.error("Failed to delete task. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting task:", error.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        color="primary"
        className="flex items-center mb-4"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft className="mr-2" /> Back
      </Button>
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">All Tasks</h2>
        <Link to="/create-task">
          <Button variant="primary">Create Task</Button>
        </Link>
      </div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Location</Table.HeadCell>
              <Table.HeadCell>Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {tasks.map((task) => (
                <Table.Row key={task._id}>
                  <Table.Cell>{task.name}</Table.Cell>
                  <Table.Cell>{task.description}</Table.Cell>
                  <Table.Cell>{task.city}</Table.Cell>
                  <Table.Cell className="flex">
                    <Link
                      to={{
                        pathname: `/update-task/${task._id}`,
                        state: { taskData: task },
                      }}
                    >
                      <Button color="success" size="sm" className="mb-2 mr-2">
                        Edit
                      </Button>
                    </Link>

                    <Button
                      gradientMonochrome="failure"
                      size="sm"
                      className="mb-2 mr-2"
                      onClick={() => handleDeleteClick(task)}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Modal
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            popup
          >
            <Modal.Header>Confirmation</Modal.Header>
            <Modal.Body>
              Are you sure you want to delete task "{selectedTask?.name}"?
            </Modal.Body>
            <Modal.Footer>
              <Button color="success" onClick={handleConfirmDelete}>
                Yes
              </Button>
              <Button color="danger" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AllTasks;
