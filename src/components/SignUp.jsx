import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, Label, Button, Select } from "flowbite-react";
import EmergencyResponderSignUp from "./ResponderSignup";
import { BASE_URL } from "../api/apiservice";
import NormalUserSignUp from "./../pages/NormalUserSignup";
import VolunteerSignUp from "./../pages/VolunteerSignup";

const SignUp = ({}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    fullName: "",
    city: "",
    age: "",
    profession: "",
    experience: "",
    availabilityDropdown: "",
    mobileNumber: "",
    profilePicture: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleBack = () => {
    setSubmitted(false);
  };

  const handleSignupSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:h-screen mt-10">
      <div
        className="w-full lg:w-1/2 bg-center lg:block hidden"
        style={{
          backgroundImage: "url(/1.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          height: "auto",
        }}
      ></div>
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center py-4">
            Sign Up
          </h2>
          {submitted ? (
            formData.role === "volunteer" ? (
              <VolunteerSignUp
                formData={formData}
                onBack={handleBack}
                onChange={handleInputChange}
                onSubmit={handleSignupSubmit}
              />
            ) : formData.role === "emergencyresponder" ? (
              <EmergencyResponderSignUp
                formData={formData}
                onBack={handleBack}
                onChange={handleInputChange}
                onSubmit={handleSignupSubmit}
              />
            ) : formData.role === "user" ? (
              <NormalUserSignUp
                formData={formData}
                onBack={handleBack}
                onChange={handleInputChange}
                onSubmit={handleSignupSubmit}
              />
            ) : null
          ) : (
            <form className="px-8 py-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="mb-4">
                  <Label htmlFor="username">Username</Label>
                  <TextInput
                    id="username"
                    name="username"
                    type="text"
                    required
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="email">Email address</Label>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                    value={formData.email}
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
                    required
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    id="role"
                    name="role"
                    className="input-field"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Role</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="emergencyresponder">
                      Emergency Responder
                    </option>
                    <option value="user">Normal User</option>
                  </Select>
                </div>
              </div>
              <div className="text-right mt-6">
                <Button type="submit" className="bg-green-400 text-white">
                  Next
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
