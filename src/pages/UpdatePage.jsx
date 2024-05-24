import React, { useState, useEffect, useRef } from "react";
import { TextInput, Label, Button, Select } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { updateFailure, updateStart, updateSuccess } from "../redux/userSlice";
import { BASE_URL } from "../api/apiservice";
import { useNavigate } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UpdateProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.user.username || "",
    password: "",
    fullName: currentUser.user.fullName || "",
    mobileNumber: currentUser.user.mobileNumber || "",
    email: currentUser.user.email || "",
    bloodGroup: currentUser.user.bloodGroup || "",
    skills: currentUser.user.skills || "",
    certifications: currentUser.user.certifications || [],
    availabilityDropdown: currentUser.user.availabilityDropdown || "",
    profilePicture:
      currentUser.user.profilePicture ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(
    currentUser.user.profilePicture || ""
  );
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileError, setImageFileError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + (imageFile.name || "unnamed");
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());

      const dataToSend = { ...formData };
      if (!formData.password) {
        delete dataToSend.password;
      }

      const res = await fetch(
        `${BASE_URL}/api/user/update/${currentUser.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const data = await res.json();

      if (res.status === 200) {
        dispatch(updateSuccess(data));
        navigate("/dashboard");
      } else {
        dispatch(updateFailure(data.message));
      }
    } catch (error) {
      console.log(error);
      dispatch(updateFailure("An error occurred while updating profile"));
    }
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        {
          certificationName: "",
          certificationDate: "",
          expirationDate: "",
        },
      ],
    });
  };

  const removeCertification = (index) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications.splice(index, 1);
    setFormData({ ...formData, certifications: updatedCertifications });
  };

  const handleCertificationChange = (index, event) => {
    const { name, value } = event.target;
    const fieldName = name.split("_")[0];
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [fieldName]: value,
    };
    setFormData((prevState) => ({
      ...prevState,
      certifications: updatedCertifications,
    }));
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-gray-900 my-8">
        Update Profile
      </h2>
      <p className="text-lg text-center text-gray-700 mb-8 ml-10">
        "Every crisis offers you extra desired power to overcome the
        challenges." - Amit Ray
      </p>
      <div className="w-full md:w-5/6 lg:w-2/4 xl:w-2/3 p-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="mb-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                hidden
              />
              <div
                className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mx-auto"
                onClick={() => fileInputRef.current.click()}
              >
                {imageFileUploadingProgress !== null && (
                  <CircularProgressbar
                    value={imageFileUploadingProgress || 0}
                    text={`${imageFileUploadingProgress}%`}
                    strokeWidth={5}
                    styles={{
                      root: {
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      },
                      path: {
                        stroke:
                          imageFileUploadingProgress < 50
                            ? `rgba(62, 152, 199, ${
                                imageFileUploadingProgress / 100
                              })`
                            : `rgba(28, 200, 138, ${
                                imageFileUploadingProgress / 100
                              })`,
                      },
                      text: {
                        fill: "#333",
                      },
                    }}
                  />
                )}
                <img
                  src={imageFileUrl || currentUser.user.profilePicture}
                  alt="user"
                  className="rounded-full w-full h-full object-cover border-8 border-[lightgray]"
                />
              </div>
            </div>
            <div className="mb-4">
              <Label htmlFor="username">Username</Label>
              <TextInput
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="fullName">Full Name</Label>
              <TextInput
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <TextInput
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <TextInput
                id="mobileNumber"
                name="mobileNumber"
                type="text"
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Select
                id="bloodGroup"
                name="bloodGroup"
                className="input-field"
                value={formData.bloodGroup || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="skills">Skills</Label>
              <TextInput
                id="skills"
                name="skills"
                type="text"
                placeholder="Skills"
                value={formData.skills}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="availabilityDropdown">Availability</Label>
              <Select
                id="availabilityDropdown"
                name="availabilityDropdown"
                className="input-field"
                value={formData.availabilityDropdown || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Availability</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="freelance">Freelance</option>
              </Select>
            </div>
            <div className="mb-4 col-span-full">
              <Label htmlFor="certifications">Certifications</Label>
              {formData.certifications.map((certification, index) => (
                <div key={index} className="mb-2 grid grid-cols-3 gap-2">
                  <TextInput
                    name={`certificationName_${index}`}
                    type="text"
                    placeholder="Certification Name"
                    value={certification.certificationName}
                    onChange={(e) => handleCertificationChange(index, e)}
                    className="w-full"
                  />
                  <TextInput
                    name={`certificationDate_${index}`}
                    type="date"
                    placeholder="Certification Date"
                    value={certification.certificationDate}
                    onChange={(e) => handleCertificationChange(index, e)}
                    className="w-full"
                  />
                  <TextInput
                    name={`expirationDate_${index}`}
                    type="date"
                    placeholder="Expiration Date"
                    value={certification.expirationDate}
                    onChange={(e) => handleCertificationChange(index, e)}
                    className="w-full"
                  />
                  <Button
                    color="failure"
                    className="col-span-full"
                    onClick={() => removeCertification(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button color="light" className="mt-2" onClick={addCertification}>
                Add Certification
              </Button>
            </div>
            <div className="mb-4 col-span-full">
              <Button type="submit" color="success" fullSized>
                Update Profile
              </Button>
            </div>
            {imageFileError && (
              <div className="text-red-500 text-sm col-span-full">
                {imageFileError}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
