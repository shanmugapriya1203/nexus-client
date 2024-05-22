import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextInput, Button } from "flowbite-react";
import { BASE_URL } from "../../api/apiservice";
import { FaArrowLeft } from "react-icons/fa";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";

const AddShelter = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    description: "",
    availability: true,
    contact: {
      email: "",
      phone: "",
    },
    photos: [""],
    mapUrl: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the changed field is within the contact object
    if (name === "email" || name === "phone") {
      setFormData({
        ...formData,
        contact: {
          ...formData.contact,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePhotoChange = (index, value) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos[index] = value;
    setFormData({
      ...formData,
      photos: updatedPhotos,
    });
  };

  const addPhoto = () => {
    setFormData({
      ...formData,
      photos: [...formData.photos, ""],
    });
  };

  const removePhoto = (index) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos.splice(index, 1);
    setFormData({
      ...formData,
      photos: updatedPhotos,
    });
  };

  const handleFileUpload = async (index, file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + (file.name || "unnamed");
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error("Error uploading file:", error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          handlePhotoChange(index, downloadURL);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/shelter/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        navigate("/dashboard?tab=shelters");
      } else {
        console.error("Failed to create shelter:", res.statusText);
      }
    } catch (error) {
      console.error("Error creating shelter:", error.message);
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

      <div className="flex flex-col items-center justify-center h-full">
        <blockquote className="italic text-lg text-center text-gray-700 mt-8 max-w-lg p-4">
          "Success is not final, failure is not fatal: It is the courage to
          continue that counts." - Winston Churchill
        </blockquote>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg p-8 bg-gray-100 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            Add Shelter
          </h2>
          <TextInput
            name="name"
            type="text"
            placeholder="Shelter Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <TextInput
            name="location"
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <TextInput
            name="capacity"
            type="number"
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <TextInput
            name="description"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Availability:
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 rounded px-4 py-2"
            >
              <option value={true}>Available</option>
              <option value={false}>Not Available</option>
            </select>
          </div>
          <TextInput
            name="mapUrl"
            type="text"
            placeholder="Map URL (iframe source)"
            value={formData.mapUrl}
            onChange={handleChange}
            required
            className="mb-4"
          />

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Photos:
            </label>
            {formData.photos.map((photo, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(index, e.target.files[0])}
                  required
                  className="mr-2"
                />
                <Button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-md mb-1"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={addPhoto}
              className="bg-green-500 hover:bg-green-600 text-white rounded-md mt-2"
            >
              Add Photo
            </Button>
          </div>
          <TextInput
            name="email"
            type="email"
            placeholder="Contact Email"
            value={formData.contact.email}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <TextInput
            name="phone"
            type="tel"
            placeholder="Contact Phone"
            value={formData.contact.phone}
            onChange={handleChange}
            required
            className="mb-4"
          />
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white rounded-md"
          >
            Add Shelter
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddShelter;
