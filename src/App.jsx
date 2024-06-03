import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SocketProvider } from "./context/SocketContext";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner";
import Header from "./components/Header";
import Home from "./pages/Home";
import EmergencyAlert from "./components/EmergencyAlert";
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const HomeShelter = lazy(() => import("./pages/HomeShelter"));
const HomeHospital = lazy(() => import("./pages/HomeHospital"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Login = lazy(() => import("./pages/Login"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UpdatePage = lazy(() => import("./pages/UpdatePage"));
const AddShelter = lazy(() => import("./components/Shelters/AddShelter"));
const ShowShelter = lazy(() => import("./components/Shelters/ShowShelter"));
const AllVolunteers = lazy(() => import("./pages/AllVolunteers"));
const AssignTask = lazy(() =>
  import("./components/VolunteerComponent/AssignTask")
);

const CreateResponder = lazy(() => import("./pages/CreateResponder"));
const AllResponders = lazy(() => import("./pages/AllResponders"));
const ShowTask = lazy(() => import("./components/VolunteerComponent/ShowTask"));
const AllTasks = lazy(() => import("./components/VolunteerComponent/AllTasks"));
const CreateTask = lazy(() =>
  import("./components/VolunteerComponent/CreateTask")
);
const EditTask = lazy(() => import("./components/VolunteerComponent/EditTask"));
const GetPlan = lazy(() => import("./pages/GetPlan"));
const CreatePlan = lazy(() => import("./pages/CreatePlan"));
const UpdatePlan = lazy(() => import("./pages/UpdatePlan"));
const EmergencyPage = lazy(() => import("./pages/EmergencyPage"));

const AlertPage = lazy(() => import("./pages/AlertPage"));
const CommunityPage = lazy(() => import("./pages/CommunityPage"));
const DonateMoney = lazy(() => import("./pages/DonateMoney"));
const DonateSupplies = lazy(() => import("./pages/DonateSupplies"));
const ShowEmergencies = lazy(() =>
  import("./components/Emergency/ShowEmergencies")
);
const HeroPage = lazy(() => import("./pages/HeroPage"));
const DashShelters = lazy(() => import("./pages/DashShelters"));

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <SocketProvider>
      <Router>
        <Header />
        <ToastContainer />
        <EmergencyAlert />
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/shelter/:shelterId" element={<HomeShelter />} />
            <Route path="/hospital/:hospitalId" element={<HomeHospital />} />
            {currentUser ? (
              <Route path="/" element={<HeroPage />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<UpdatePage />} />
                <Route path="/add-shelter" element={<AddShelter />} />
                <Route path="/shelter/:shelterId" element={<ShowShelter />} />
                <Route path="/volunteers" element={<AllVolunteers />} />
                <Route path="/admin/assign-task/:id" element={<AssignTask />} />
                <Route path="/admin/tasks" element={<AllTasks />} />
                <Route path="/tasks" element={<ShowTask />} />
                <Route path="/incidents" element={<ShowEmergencies />} />
                <Route path="/create-task" element={<CreateTask />} />

                <Route path="/update-task/:taskId" element={<EditTask />} />
                <Route
                  path="/allocate/:incidentId"
                  element={<AllResponders />}
                />
                <Route path="/create-responder" element={<CreateResponder />} />
                <Route path="/allresponders" element={<AllResponders />} />
                <Route path="/shelters" element={<DashShelters />} />
                <Route path="/plans" element={<GetPlan />} />
                <Route path="/createplan" element={<CreatePlan />} />
                <Route path="/updateplan" element={<UpdatePlan />} />
                <Route path="/emergencies" element={<EmergencyPage />} />
                <Route path="/alerts" element={<AlertPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/donatemoney" element={<DonateMoney />} />

                <Route path="/donatesupplies" element={<DonateSupplies />} />
              </Route>
            ) : null}
          </Routes>
        </Suspense>
      </Router>
    </SocketProvider>
  );
}

export default App;
