import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UpdatePage from "./pages/UpdatePage";
import AddShelter from "./components/AddShelter";
import ShowShelter from "./components/ShowShelter";
import Home from "./pages/Home";
import AllVolunteers from "./components/VolunteerComponent/AllVolunteers";
import AssignTask from "./components/VolunteerComponent/AssignTask";
import ShowTask from "./components/VolunteerComponent/ShowTask";
import AllTasks from "./components/VolunteerComponent/AllTasks";
import CreateTask from "./components/VolunteerComponent/CreateTask";
import EditTask from "./components/VolunteerComponent/EditTask";
import GetPlan from "./components/Plans/GetPlan";
import CreatePlan from "./components/Plans/CreatePlan";
import UpdatePlan from "./components/Plans/UpdatePlan";
import EmergencyPage from "./pages/EmergencyPage";
import AllocateResponder from "./components/Emergency/AllocateResponder";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (!currentUser) {
  //     window.location.href = "/"; // Redirect to home page if user is not logged in
  //   }
  // }, [currentUser]);

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UpdatePage />} />
        <Route path="/add-shelter" element={<AddShelter />} />
        <Route path="/shelter/:shelterId" element={<ShowShelter />} />
        <Route path="/admin/volunteers" element={<AllVolunteers />} />
        <Route path="/admin/assign-task/:id" element={<AssignTask />} />
        <Route path="/admin/tasks" element={<AllTasks />} />
        <Route path="/tasks" element={<ShowTask />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/update-task/:taskId" element={<EditTask />} />
        <Route path="/allocate/:incidentId" element={<AllocateResponder />} />
        <Route path="/plans" element={<GetPlan />} />
        <Route path="/createplan" element={<CreatePlan />} />
        <Route path="/updateplan" element={<UpdatePlan />} />
        <Route path="/emergencies" element={<EmergencyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
