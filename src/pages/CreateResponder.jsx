import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Label, TextInput, Select, Button } from "flowbite-react";
import { BASE_URL } from "../api/apiservice";

const CreateResponder = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    mobileNumber: "",
    profession: "",
  });

  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/responder/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Responder created successfully!");
        navigate("/allresponders");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error creating responder");
      }
    } catch (error) {
      toast.error(
        error.message || "Error creating responder. Please try again."
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Create Responder</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div className="mb-4">
          <Label htmlFor="name" value="Name" className="mt-4" />
          <TextInput
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 block w-full"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="location" value="Location" className="mt-4" />
          <TextInput
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-2 block w-full"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="mobileNumber"
            value="Mobile Number"
            className="mt-4"
          />
          <TextInput
            id="mobileNumber"
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="mt-2 block w-full"
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="profession" value="Profession" className="mt-4" />
          <Select
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
            className="mt-2 block w-full"
          >
            <option value="">Select Profession</option>
            <option value="firefighter">Firefighter</option>
            <option value="nurse">Nurse</option>
            <option value="doctor">Doctor</option>
            <option value="engineer">Engineer</option>
            <option value="paramedic">Paramedic</option>
            <option value="technician">Technician</option>
            <option value="police">Police</option>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Button type="submit" color="success" className="mt-4">
            Create Responder
          </Button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(CreateResponder);
