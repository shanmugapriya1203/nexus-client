import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { TextInput, Card, Radio } from "flowbite-react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../api/apiservice";
import { FaPhone, FaFire, FaMedal } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

import Carousel from "react-multi-carousel";
import axios from "axios";
import "react-multi-carousel/lib/styles.css";
import WeatherWidget from "../components/WeatherWidjet";
import { RiArrowRightSLine } from "react-icons/ri";

const Home = () => {
  const [shelters, setShelters] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("shelter");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [weather, setWeather] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false);
  const [news, setNews] = useState([]);
  const emergencyContacts = useMemo(
    () => [
      {
        name: "Local Police Department",
        phoneNumber: "100",
        icon: <FaPhone />,
        color: "#3B82F6",
      },
      {
        name: "Fire Department",
        phoneNumber: "104",
        icon: <FaFire />,
        color: "#EF4444",
      },
      {
        name: "Ambulance Service",
        phoneNumber: "108",
        icon: <FaPhone />,
        color: "#10B981",
      },
      {
        name: "Emergency Contact Name",
        phoneNumber: "911",
        icon: <FaPhone />,
        color: "#6B7280",
      },
    ],
    []
  );

  const HeroesOfTheDay = () => {
    const heroes = [
      {
        name: "Community Volunteer Group",
        description:
          "Provided food and shelter to 100 families during the recent flood",
        icon: <FaMedal />,
        color: "#F59E0B",
      },
      {
        name: "Local Fire Department",
        description: "Rescued 20 people trapped in a burning building",
        icon: <FaMedal />,
        color: "#EF4444",
      },
      {
        name: "Medical Team",
        description:
          "Saved lives by providing emergency medical care to accident victims",
        icon: <FaMedal />,
        color: "#10B981",
      },
    ];

    return (
      <div className="mt-12">
        <h1 className="text-gray-700 font-bold text-2xl lg:text-4xl mb-2">
          Heroes of the Day
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8 ml-4">
          {heroes.map((hero, index) => (
            <div className="max-w-xs" key={index}>
              <Card className="h-full" style={{ backgroundColor: hero.color }}>
                <div className="p-1">
                  <div className="flex items-center mb-2">
                    <div className="mr-2 text-white">{hero.icon}</div>
                    <h5 className="text-xl font-bold tracking-tight text-white">
                      {hero.name}
                    </h5>
                  </div>
                  <p className="text-sm text-white">{hero.description}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SafetyTips = () => {
    const safetyTips = [
      {
        title: "Fire Safety",
        description:
          "Install smoke alarms in your home and test them regularly.",
      },
      {
        title: "Flood Safety",
        description: "Avoid walking or driving through floodwaters.",
      },
      {
        title: "Earthquake Safety",
        description: "Drop, cover, and hold on during an earthquake.",
      },
    ];

    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-gray-700 font-bold text-2xl lg:text-4xl mb-2">
          Safety Tips
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-2">
          <div className="w-full">
            <ul className="list-disc ml-6">
              {safetyTips.map((tip, index) => (
                <li key={index} className="mb-4">
                  <h3 className="font-bold">{tip.title}</h3>
                  <p>{tip.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (searchType === "shelter") {
      fetchShelters();
    } else {
      fetchHospitals();
    }
  }, [searchType]);

  const fetchShelters = useCallback(async () => {
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
  }, []);

  const fetchHospitals = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/hospital/`);
      if (res.ok) {
        const data = await res.json();
        setHospitals(data);
      } else {
        console.error("Failed to fetch hospitals:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error.message);
    }
  }, []);
  const fetchSheltersByLocation = useCallback(async (location) => {
    try {
      const res = await fetch(`${BASE_URL}/api/shelter/location/${location}`);
      if (res.ok) {
        const data = await res.json();
        const regex = new RegExp(location.trim(), "i");
        const filteredData = data.filter((shelter) =>
          regex.test(shelter.location.trim())
        );
        setShelters(filteredData);
      } else {
        console.error("Failed to fetch shelters by location:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching shelters by location:", error.message);
    }
  }, []);

  const fetchHospitalsByArea = useCallback(async (area) => {
    try {
      const res = await fetch(`${BASE_URL}/api/hospital/area/${area}`);
      if (res.ok) {
        const data = await res.json();
        const regex = new RegExp(area.trim(), "i");
        const filteredData = data.filter((hospital) =>
          regex.test(hospital.area.trim())
        );
        setHospitals(filteredData);
      } else {
        console.error("Failed to fetch hospitals by area:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching hospitals by area:", error.message);
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (searchType === "shelter") {
      if (searchLocation.trim() === "") {
        fetchShelters();
      } else {
        fetchSheltersByLocation(searchLocation);
      }
    } else if (searchType === "hospital") {
      if (searchLocation.trim() === "") {
        fetchHospitals();
      } else {
        fetchHospitalsByArea(searchLocation);
      }
    }
  }, [
    fetchHospitals,
    fetchHospitalsByArea,
    fetchShelters,
    fetchSheltersByLocation,
    searchLocation,
    searchType,
  ]);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      handleSearch();
    }, 500);
    setDebounceTimeout(timeout);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchLocation, searchType, handleSearch]);

  const responsive = useMemo(
    () => ({
      superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 4 },
      desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
      tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
      mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    }),
    []
  );

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const apiKey = "90b950dba316f5e49546655bb9ae5df7";
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        setWeather(res.data);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    };

    if (!locationFetched && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
          setLocationFetched(true);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    }
  }, [locationFetched]);

  const temperature = weather ? weather.main.temp : null;

  return (
    <>
      <div className="flex flex-col gap-6 p-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-green-700 font-bold text-3xl lg:text-6xl">
          Discover Nexus for your next{" "}
          <span className="text-green-500">critical</span>
          <br />
          disaster management solution
        </h1>
        <div className="text-gray-600 text-xs sm:text-sm">
          Nexus, your reliable partner in disaster management, where every
          solution is tailored to protect and serve.
          <br />
          Explore tools that safeguard, strategies that empower, and the support
          you need in times of crisis.
        </div>
        <div className="flex justify-center mt-6 gap-4">
          <label className="mr-2 flex justify-center items-center gap-2">
            <Radio
              name="searchType"
              value="shelter"
              checked={searchType === "shelter"}
              onChange={() => setSearchType("shelter")}
            />
            Shelters
          </label>
          <label className="mr-2 flex justify-center items-center gap-2">
            <Radio
              name="searchType"
              value="hospital"
              checked={searchType === "hospital"}
              onChange={() => setSearchType("hospital")}
            />
            Hospitals
          </label>
        </div>
        <div className="flex justify-center mt-2 relative w-full">
          <div className="relative w-full max-w-md">
            <input
              className="w-full pl-3 pr-10 py-2 border rounded-md"
              type="text"
              placeholder={`Search for ${
                searchType === "shelter" ? "shelters" : "hospitals"
              }...`}
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
            <HiSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>

        <h1 className="text-gray-700 font-bold text-2xl lg:text-4xl mb-2 mt-8">
          {searchType === "shelter" ? "Shelters" : "Hospitals"}
        </h1>

        {searchType === "shelter" ? (
          shelters.length === 0 ? (
            <div className="text-center text-gray-600 mt-4">
              No shelters found in this location.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 ml-4">
              {shelters.map((shelter) => (
                <div className="max-w-xs" key={shelter._id}>
                  <Link to={`/shelter/${shelter._id}`}>
                    <Card className="h-full">
                      <img
                        src={shelter.photos[0]}
                        alt={shelter.name}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                      <div className="p-4">
                        <h5 className="text-xl font-bold tracking-tight text-gray-900">
                          {shelter.name}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {shelter.location}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          )
        ) : hospitals.length === 0 ? (
          <div className="text-center text-gray-600 mt-4">
            No hospitals found in this area.
          </div>
        ) : (
          <Carousel responsive={responsive} containerClass="carousel-container">
            {hospitals.map((hospital) => (
              <div className="max-w-xs" key={hospital._id}>
                <Link to={`/hospital/${hospital._id}`}>
                  <Card
                    className="max-w-sm h-full"
                    style={{ marginRight: "15px" }}
                  >
                    <img
                      src={hospital.photoUrl}
                      alt={hospital.name}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                    <div className="p-4 h-full">
                      <h5 className="text-xl font-bold tracking-tight text-gray-900">
                        {hospital.name}
                      </h5>
                      <p className="text-sm text-gray-600">
                        {hospital.area}, {hospital.city}
                      </p>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </Carousel>
        )}

        <h1 className="text-gray-700 font-bold text-2xl lg:text-4xl mb-2">
          Emergency Contacts
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 ml-4">
          {emergencyContacts.map((contact, index) => (
            <div className="max-w-xs" key={index}>
              <Card className="h-full">
                <div className="p-1">
                  <div className="flex items-center mb-2">
                    <div className="mr-2" style={{ color: contact.color }}>
                      {contact.icon}
                    </div>
                    <h5 className="text-xl font-bold tracking-tight text-gray-900">
                      {contact.name}
                    </h5>
                  </div>
                  <p className="text-sm text-gray-600">{contact.phoneNumber}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <h1 className="text-gray-700 font-bold text-2xl lg:text-4xl mb-2">
          Current Weather
        </h1>
        {!locationFetched ? (
          <div className="text-center text-gray-600 mt-4">
            Please allow location access to fetch weather information.
          </div>
        ) : (
          <WeatherWidget weather={weather} />
        )}

        <HeroesOfTheDay />
        <div className="flex flex-col sm:flex-row md:mt-10 h-full mt-10">
          <div className="w-full sm:w-1/2 p-6 sm:p-8">
            <div className="rounded-lg h-full">
              <h2 className="text-gray-700 font-bold text-2xl lg:text-4xl mb-2">
                Become a Volunteer
              </h2>
            </div>
          </div>
          <div className="w-full sm:w-1/2 sm:p-8 flex flex-col justify-center items-center text-2xl">
            <p className="text-center mb-5 mx-3">
              Join our team and make a difference in the community by
              volunteering.
            </p>
            <div className="flex flex-wrap text-lg">
              <Link to="/signup">
                <button className="bg-white text-black py-2 px-4 rounded flex items-center">
                  Sign Up <RiArrowRightSLine className="ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <SafetyTips />
      </div>
      <footer className="mt-10 bg-gray-200 flex flex-col md:flex-row items-center md:justify-between">
        <div className="p-6 sm:p-8 hidden sm:block">
          <img src="/nexus3.png" alt="logo" className="h-16" />
        </div>

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-center">
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600"
            >
              <FaFacebook className="text-xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-center">
          <div className="text-center sm:text-left">
            <p>Contact: (123) 456-7890</p>
            <p>Email: contact@example.com</p>
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-center">
          <div className="flex flex-col text-center sm:text-left">
            <a
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 mb-1"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-600 hover:text-gray-900">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
