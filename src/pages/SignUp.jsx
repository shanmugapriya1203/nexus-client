import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextInput, Label, Button, Select } from "flowbite-react";
import { BASE_URL } from "../api/apiservice";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import VolunteerSignUp from "./VolunteerSignup";

const SignUp = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({});

  const initialValues = {
    username: "",
    email: "",
    password: "",
    role: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Role is required"),
  });

  const handleSubmit = (values) => {
    setFormValues(values);
    setSubmitted(true);
  };

  const handleBack = () => {
    setSubmitted(false);
  };

  const handleSignupSubmit = async (additionalValues) => {
    const formData = { ...formValues, ...additionalValues };
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
      navigate("/login");
      toast.success("Registration successful! Please login.");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch mt-10">
      <div
        className="w-full h-screen lg:w-1/2 bg-center lg:block hidden"
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
            <VolunteerSignUp
              onBack={handleBack}
              onSubmit={handleSignupSubmit}
              initialValues={{
                fullName: "",
                city: "",
                area: "",
                profession: "",
                mobileNumber: "",
                availabilityDropdown: "",
              }}
            />
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="px-8 py-6">
                  <div className="space-y-4">
                    <div className="mb-4">
                      <Label htmlFor="username">Username</Label>
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        as={TextInput}
                        placeholder="Username"
                      />
                      {errors.username && touched.username && (
                        <div className="text-red-500 text-sm">
                          {errors.username}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="email">Email address</Label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        as={TextInput}
                        placeholder="Email address"
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-sm">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="password">Password</Label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        as={TextInput}
                        placeholder="Password"
                      />
                      {errors.password && touched.password && (
                        <div className="text-red-500 text-sm">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="role">Role</Label>
                      <Field id="role" name="role" as={Select}>
                        <option value="">Select Role</option>
                        <option value="volunteer">Volunteer</option>
                      </Field>
                      {errors.role && touched.role && (
                        <div className="text-red-500 text-sm">
                          {errors.role}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right mt-6">
                    <Button type="submit" className="bg-green-400 text-white">
                      Next
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
          <div className={`text-center my-4 ${submitted ? "hidden" : ""}`}>
            <span className="text-gray-700">Have an account? </span>
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
