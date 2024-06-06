import React from "react";
import { TextInput, Label, Button, Select } from "flowbite-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const VolunteerSignUp = ({ initialValues, onBack, onSubmit }) => {
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    city: Yup.string().required("City is required"),
    area: Yup.string().required("Area is required"),
    profession: Yup.string().required("Profession is required"),
    mobileNumber: Yup.string().required("Mobile Number is required"),
    availabilityDropdown: Yup.string().required("Availability is required"),
  });

  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-10">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="px-8 py-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Field
                    id="fullName"
                    name="fullName"
                    type="text"
                    as={TextInput}
                    placeholder="Full Name"
                  />
                  {errors.fullName && touched.fullName && (
                    <div className="text-red-500 text-sm">
                      {errors.fullName}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Field
                    id="city"
                    name="city"
                    type="text"
                    as={TextInput}
                    placeholder="City"
                  />
                  {errors.city && touched.city && (
                    <div className="text-red-500 text-sm">{errors.city}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="area">Area</Label>
                  <Field
                    id="area"
                    name="area"
                    type="text"
                    as={TextInput}
                    placeholder="Area"
                  />
                  {errors.area && touched.area && (
                    <div className="text-red-500 text-sm">{errors.area}</div>
                  )}
                </div>
                <div>
                  <Label htmlFor="profession">Profession</Label>
                  <Field
                    id="profession"
                    name="profession"
                    type="text"
                    as={TextInput}
                    placeholder="Profession"
                  />
                  {errors.profession && touched.profession && (
                    <div className="text-red-500 text-sm">
                      {errors.profession}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Field
                    id="mobileNumber"
                    name="mobileNumber"
                    type="text"
                    as={TextInput}
                    placeholder="Mobile Number"
                  />
                  {errors.mobileNumber && touched.mobileNumber && (
                    <div className="text-red-500 text-sm">
                      {errors.mobileNumber}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="availabilityDropdown">Availability</Label>
                  <Field
                    id="availabilityDropdown"
                    name="availabilityDropdown"
                    as={Select}
                  >
                    <option value="">Select Availability</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                  </Field>
                  {errors.availabilityDropdown &&
                    touched.availabilityDropdown && (
                      <div className="text-red-500 text-sm">
                        {errors.availabilityDropdown}
                      </div>
                    )}
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VolunteerSignUp;
