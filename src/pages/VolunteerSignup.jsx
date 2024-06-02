import React from "react";
import { TextInput, Label, Button, Select } from "flowbite-react";

const VolunteerSignUp = ({ formData, onBack, onChange, onSubmit }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <form className="px-8 py-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <TextInput
                id="fullName"
                name="fullName"
                type="text"
                required
                placeholder="Full Name"
                value={formData.fullName}
                onChange={onChange}
              />
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <TextInput
                id="city"
                name="city"
                type="text"
                required
                placeholder="City"
                value={formData.city}
                onChange={onChange}
              />
            </div>
            <div>
              <Label htmlFor="area">Area</Label>
              <TextInput
                id="area"
                name="area"
                type="text"
                required
                placeholder="Area"
                value={formData.area}
                onChange={onChange}
              />
            </div>
            <div>
              <Label htmlFor="profession">Profession</Label>
              <TextInput
                id="profession"
                name="profession"
                type="text"
                required
                placeholder="Profession"
                value={formData.profession}
                onChange={onChange}
              />
            </div>
            <div>
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <TextInput
                id="mobileNumber"
                name="mobileNumber"
                type="text"
                required
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={onChange}
              />
            </div>

            <div>
              <Label htmlFor="availabilityDropdown">Availability</Label>
              <Select
                id="availabilityDropdown"
                name="availabilityDropdown"
                className="input-field"
                value={formData.availabilityDropdown}
                onChange={onChange}
              >
                <option value="">Select Availability</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
              </Select>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Button
              type="button"
              onClick={onBack}
              className="bg-gray-300 text-gray-800"
            >
              Back
            </Button>
            <Button type="submit" className="bg-green-400 text-white">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerSignUp;
