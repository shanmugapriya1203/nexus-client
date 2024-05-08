import React, { useState } from 'react';
import { TextInput, Label, Button } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/userSlice';
import { BASE_URL } from '../api/apiservice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const dispatch = useDispatch(); // Initialize useDispatch hook
  const formDataFromStore = useSelector(state => state.formData); // Select formData from Redux store
  const navigate=useNavigate()
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
  
    try {
      dispatch(signInStart());
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await res.json();
  
      if (res.status === 200) {
        const { token, user, ...rest } = data;
        if (token) {
          localStorage.setItem('token', token);
        }
        dispatch(signInSuccess({ user, ...rest }));
        navigate('/dashboard'); 
      } else {
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure('An error occurred while signing in'));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:h-screen mt-10">
      <div className="w-full lg:w-1/2 bg-center lg:block hidden" style={{
        backgroundImage: 'url(/1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        height: 'auto'
      }}></div>
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
              </div>
              <div className="text-right mt-6">
                <Button type="submit" className="bg-green-400 text-white">
                  Login
                </Button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
