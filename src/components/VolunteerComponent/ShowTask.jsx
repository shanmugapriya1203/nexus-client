import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DashSidebar from "../DashSidebar";
import { BASE_URL } from "../../api/apiservice";
import { Button, Modal } from "flowbite-react";

const ShowTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null); // New state variable
  const currentUser = useSelector((state) => state.user.currentUser);
  const userId = currentUser.user._id;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/volunteers/tasks/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch tasks:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleCompleteTask = (taskId) => {
    setSelectedTaskId(taskId); // Set the selected task ID
    setShowModal(true);
  };

  const handleConfirmCompletion = async (confirmed) => {
    if (confirmed && selectedTaskId) {
      try {
        const res = await fetch(
          `${BASE_URL}/api/volunteers/tasks/${selectedTaskId}/complete`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          // Fetch updated task details
          const updatedRes = await fetch(
            `${BASE_URL}/api/volunteers/tasks/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (updatedRes.ok) {
            const updatedData = await updatedRes.json();
            setTasks(updatedData);
            setCompleted(true);
          } else {
            console.error(
              "Failed to fetch updated tasks:",
              updatedRes.statusText
            );
          }

          setShowModal(false);
        } else {
          console.error("Failed to complete task:", res.statusText);
        }
      } catch (error) {
        console.error("Error completing task:", error.message);
      }
    } else {
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="">
        <DashSidebar />
      </div>
      <div className="flex-grow p-6">
        {loading ? (
          <p>Loading task details...</p>
        ) : (
          <div>
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col mb-4"
              >
                <h1 className="text-3xl font-bold mb-4">{task.name}</h1>
                <p className="mb-2">Description: {task.description}</p>
                <p
                  className={`mb-2 text-${
                    task.status === "pending" ? "red" : "green"
                  }-500`}
                >
                  Status: {task.status.toUpperCase()}
                </p>
                <p className="mb-2">Area: {task.area}</p>
                <div className="mt-auto">
                  {task.status === "completed" ? (
                    <Button color="success">Completed</Button>
                  ) : (
                    <Button
                      gradientMonochrome="success"
                      onClick={() => handleCompleteTask(task._id)}
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header>Complete Task</Modal.Header>
        <Modal.Body>
          Are you sure you want to mark this task as completed?
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={() => handleConfirmCompletion(true)}>
            Yes
          </Button>
          <Button color="danger" onClick={() => handleConfirmCompletion(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowTask;
