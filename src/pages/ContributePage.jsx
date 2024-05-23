import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../api/apiservice";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateRoleSuccess } from "../redux/userSlice";
const Contribute = () => {
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [newRole, setNewRole] = useState("");
  const userId = currentUser.user._id;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/user/updaterole`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newRole }),
      });
      if (response.ok) {
        toast.success("User role updated successfully");
        dispatch(updateRoleSuccess(newRole));
        naviagate("/dashboard");
      } else {
        toast.error("Error updating user role");
        console.error("Error updating user role:", response.statusText);
      }
    } catch (error) {
      toast.error("Error updating user role");
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Choose Your Role</h2>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="volunteer"
            value="volunteer"
            checked={newRole === "volunteer"}
            onChange={() => setNewRole("volunteer")}
          />
          <label htmlFor="volunteer" className="ml-2 mr-4 text-gray-800">
            Volunteer
          </label>
          <input
            type="radio"
            id="emergencyresponder"
            value="emergencyresponder"
            checked={newRole === "emergencyresponder"}
            onChange={() => setNewRole("emergencyresponder")}
          />
          <label htmlFor="emergencyresponder" className="ml-2 text-gray-800">
            Emergency Responder
          </label>
        </div>
        <Button onClick={handleSubmit} className=" text-white" color="success">
          Update Role
        </Button>
      </div>
    </div>
  );
};

export default Contribute;
