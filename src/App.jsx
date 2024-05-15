import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UpdatePage from "./pages/UpdatePage";
import AddShelter from "./components/AddShelter";
import ShowShelter from "./components/ShowShelter";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UpdatePage />} />
        <Route path="/add-shelter" element={<AddShelter />} />
        <Route path="/shelter/:shelterId" element={<ShowShelter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
