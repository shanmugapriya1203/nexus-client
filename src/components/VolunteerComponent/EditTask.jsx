import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Label, TextInput, Button, Select } from "flowbite-react";
import { BASE_URL } from "../../api/apiservice";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
const EditTask = () => {
  const { taskId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    city: "",
    area: "",
    status: "pending",
  });

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/volunteers/tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const taskData = await res.json();
          setFormData({
            name: taskData.name,
            description: taskData.description,
            city: taskData.city,
            area: taskData.area,
            status: taskData.status,
          });
        } else {
          console.error("Failed to fetch task data:", res.statusText);
          toast.error("Failed to fetch task data. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching task data:", error.message);
        toast.error("Error fetching task data. Please try again.");
      }
    };

    fetchTaskData();
  }, [taskId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/volunteers/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Task updated successfully!"); // Updated toast message
      } else {
        console.error("Failed to update task:", res.statusText);
        toast.error("Failed to update task. Please try again.");
      }
    } catch (error) {
      console.error("Error updating task:", error.message);
      toast.error("Error updating task. Please try again.");
    }
  };

  return (
    <>
      <Button
        color="primary"
        className="flex items-center mb-4"
        onClick={() => window.history.back()}
      >
        <FaArrowLeft className="mr-2" /> Back
      </Button>
      <div className="flex items-center justify-center min-h-screen">
        <form
          className="max-w-md w-full p-6 bg-white shadow-md rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
          <div className="mb-4">
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Task Name"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description" value="Description" />
            <TextInput
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Task Description"
              textarea
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="city" value="City" />
            <TextInput
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="area" value="Area" />
            <TextInput
              id="area"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              placeholder="Area"
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="status" value="Status" />
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="input-field"
              required
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="inProgress">In Progress</option>
            </Select>
          </div>

          <Button type="submit" variant="primary">
            Update Task
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditTask;
