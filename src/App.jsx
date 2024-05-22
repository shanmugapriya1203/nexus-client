import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketProvider } from "./context/SocketContext";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UpdatePage from "./pages/UpdatePage";
import AddShelter from "./components/Shelters/AddShelter";
import ShowShelter from "./components/Shelters/ShowShelter";
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
import AlertPage from "./pages/AlertPage";
import CommunityPage from "./pages/CommunityPage";
import DonateMoney from "./pages/DonateMoney";
import DonateSupplies from "./pages/DonateSupplies";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <SocketProvider>
      <Router>
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
          <Route path="/alerts" element={<AlertPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/donatemoney" element={<DonateMoney />} />
          <Route path="/donatesupplies" element={<DonateSupplies />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;
