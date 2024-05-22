import React, { useState } from "react";
import { TextInput, Label, Button } from "flowbite-react";
import { BASE_URL } from "../api/apiservice";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/user/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-3xl font-extrabold text-gray-900 text-center py-4">
        Forgot Password
      </h2>
      <form className="px-8 py-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <TextInput
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="text-right mt-6">
          <Button type="submit" color="success" className="text-white">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
