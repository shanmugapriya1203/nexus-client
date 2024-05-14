import React, { useState } from 'react';
import { TextInput, Label, Button, Select } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFailure, updateStart, updateSuccess } from '../redux/userSlice';
import { BASE_URL } from '../api/apiservice';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    username: currentUser.user.username || '',
    password: '',
    fullName: currentUser.user.fullName || '',
    mobileNumber: currentUser.user.mobileNumber || '',
    email: currentUser.user.email || '',
    bloodGroup: currentUser.user.bloodGroup || '',
    skills: currentUser.user.skills || '',
    certifications: currentUser.user.certifications || [], // Changed to an array
    availabilityDropdown: currentUser.user.availabilityDropdown || ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle changes in form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateStart());

      const dataToSend = { ...formData };
      if (!formData.password) {
        delete dataToSend.password;
      }

      const res = await fetch(`${BASE_URL}/api/user/update/${currentUser.user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dataToSend)
      });

      const data = await res.json();

      if (res.status === 200) {
        dispatch(updateSuccess(data));
        navigate('/dashboard');
      } else {
        dispatch(updateFailure(data.message));
      }
    } catch (error) {
      dispatch(updateFailure('An error occurred while updating profile'));
    }
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        {
          certificationName: '',
          certificationDate: '',
          expirationDate: ''
        }
      ]
    });
  };

  const removeCertification = (index) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications.splice(index, 1);
    setFormData({ ...formData, certifications: updatedCertifications });
  };

// Function to handle changes in certification fields
const handleCertificationChange = (index, event) => {
    const { name, value } = event.target;
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [name]: value
    };
    setFormData((prevState) => ({
      ...prevState,
      certifications: updatedCertifications
    }));
  };
  
  

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-gray-900 my-4">Update Profile</h2>
      <p className="text-lg text-center text-gray-700 mb-8">
        "Every crisis offers you extra desired power to overcome the challenges." - Amit Ray
      </p>
      <div className="w-full md:w-3/4 lg:w-1/2 p-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Existing form fields */}
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
                value={formData.bloodGroup || ''}
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

            {/* Certifications */}
            {currentUser.user.role === 'emergencyresponder' && (
  <div>
    <Label htmlFor="certifications">Certifications</Label>
    {formData.certifications.map((certification, index) => (
      <div key={index} className="flex space-x-2">
        <TextInput
          name={`certificationName${index}`} // Corrected the name attribute
          type='text'
          placeholder="Certification Name"
          value={certification.certificationName}
          onChange={(e) => handleCertificationChange(index, e)}
        />
        <TextInput
          name={`certificationDate${index}`}
          type="date"
          placeholder="Certification Date"
          value={certification.certificationDate}
          onChange={(e) => handleCertificationChange(index, e)}
        />
        <TextInput
          name={`expirationDate${index}`}
          type="date"
          placeholder="Expiration Date"
          value={certification.expirationDate}
          onChange={(e) => handleCertificationChange(index, e)}
        />
        <Button type="button" className='mt-2' onClick={() => removeCertification(index)}>Remove</Button>
      </div>
    ))}
    <Button type="button" onClick={addCertification}>Add Certification</Button>
  </div>
)}


{currentUser.user.role === 'volunteer' && (
            <div className="mb-4">
              <Label htmlFor="skills">Skills</Label>
              <Select
                id="skills"
                name="skills"
                className="input-field"
                value={formData.skills || ''}
                onChange={handleInputChange}
              >
                <option value="">Select Skill</option>
                <option value="communication">Communication</option>
                <option value="teamwork">Teamwork</option>
                <option value="leadership">Leadership</option>
                <option value="organization">Organization</option>
              </Select>
            </div>
          )}
          {
            currentUser.user.role=== 'volunteer ' || currentUser.user.role ==='emergencyresponder' && (
<div className="mb-4">
              <Label htmlFor="availabilityDropdown">Availability Dropdown</Label>
              <Select
                id="availabilityDropdown"
                name="availabilityDropdown"
                className="input-field"
                value={formData.availabilityDropdown || ''}
                onChange={handleInputChange}
              >
                <option value="">Select Availability</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
              </Select>
            </div>
            )
          }
            
          </div>
          <div className="text-right mt-6">
            <Button type="submit" className="bg-green-400 text-white">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
