import React, { useState, useEffect } from "react";
import { MdSearch } from "react-icons/md";
import { TextInput, Card, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../api/apiservice";
import { Link } from "react-router-dom";

const DashShelters = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [shelters, setShelters] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    fetchShelters();
  }, []);

  const fetchShelters = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/shelter/`);
      if (res.ok) {
        const data = await res.json();
        setShelters(data);
      } else {
        console.error("Failed to fetch shelters:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching shelters:", error.message);
    }
  };

  useEffect(() => {
    if (searchLocation.trim() !== "") {
      fetchSheltersByLocation(searchLocation);
    } else {
      fetchShelters();
    }
  }, [searchLocation]);

  const fetchSheltersByLocation = async (location) => {
    try {
      const res = await fetch(`${BASE_URL}/api/shelter/location/${location}`);
      if (res.ok) {
        const data = await res.json();
        setShelters(data);
      } else {
        console.error("Failed to fetch shelters by location:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching shelters by location:", error.message);
    }
  };

  const handleSearch = () => {
    fetchSheltersByLocation(searchLocation);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-extrabold text-gray-900 mt-8">Shelters</h1>
      <p className="italic text-lg text-gray-700 mb-8">
        "In the face of disaster, recovery begins with shelter and hope."
      </p>
      <div className="flex items-center">
        <div className="relative w-full max-w-lg">
          <TextInput
            className="w-full pl-10"
            type="text"
            placeholder="Search Shelters..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
            <MdSearch className="text-gray-400" onClick={handleSearch} />
          </div>
        </div>
        {currentUser.user.role === "admin" && (
          <Link to="/add-shelter">
            <Button className="ml-2"> Add</Button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 ml-4">
        {shelters.map((shelter) => (
          <div className="max-w-xs" key={shelter._id}>
            <Link to={`/shelter/${shelter._id}`}>
              <Card className="h-full">
                <img
                  src={shelter.photos[0]}
                  alt={shelter.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h5 className="text-xl font-bold tracking-tight text-gray-900">
                    {shelter.name}
                  </h5>
                  <p className="text-sm text-gray-600">{shelter.location}</p>
                </div>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashShelters;
