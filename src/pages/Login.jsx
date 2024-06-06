import React, { useState, useEffect } from "react";
import { TextInput, Label, Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/userSlice";
import { BASE_URL } from "../api/apiservice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("token");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      dispatch(signInFailure("Please fill all the fields"));
      toast.error("Please fill all the fields");
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        const { token, user, ...rest } = data;
        if (token) {
          localStorage.setItem("token", token);
        }
        dispatch(signInSuccess({ user, ...rest }));
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        dispatch(signInFailure(data.message));
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      dispatch(signInFailure("An error occurred while signing in"));
      toast.error("An error occurred while signing in");
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
            Login
          </h2>
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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <TextInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full relative"
                  />
                  <div className="absolute right-2 inset-y-0 flex items-center cursor-pointer">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="focus:outline-none"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right mt-6">
              <Button type="submit" className="bg-green-400 text-white">
                Login
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link
              to="/forgotpassword"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center my-4">
            <span className="text-gray-700">Don't have an account? </span>
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
