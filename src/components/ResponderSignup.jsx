import React from 'react';
import { TextInput, Label, Button } from 'flowbite-react';

const EmergencyResponderSignUp = ({ formData, onBack, onChange }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
 
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <form className="px-8" onSubmit={handleSubmit}>
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
              <Label htmlFor="age">Age</Label>
              <TextInput
                id="age"
                name="age"
                type="number"
                required
                placeholder="Age"
                value={formData.age}
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
              <Label htmlFor="experience">Experience</Label>
              <TextInput
                id="experience"
                name="experience"
                type="text"
                required
                placeholder="Experience"
                value={formData.experience}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <Button type="button" onClick={onBack} className="bg-gray-300 text-gray-800">
              Back
            </Button>
            <Button type="submit" className="bg-green-400 text-white">
              Submit
            </Button>
          </div>
        </form>
      </div>

  );
};

export default EmergencyResponderSignUp;
