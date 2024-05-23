import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../api/apiservice";
import { toast, ToastContainer } from "react-toastify";
import { SocketContext } from "../context/SocketContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Table,
  Modal,
  TextInput,
  Button,
  Label,
  Select,
  Pagination,
} from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashSidebar from "../components/DashSidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend
);

const AlertPage = () => {
  const [alerts, setAlerts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    message: "",
    location: "",
    severity: "low",
    status: "open",
  });
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertsPerPage] = useState(5);

  const onPageChange = (page) => setCurrentPage(page);

  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlerts();

    socket.on("newAlert", (alert) => {
      setAlerts((prevAlerts) => [alert, ...prevAlerts]);
    });

    return () => {
      socket.off("newAlert");
    };
  }, [socket]);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    const severityCount = countSeverity();
    const data = generateData(severityCount);
    const options = generateOptions();

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new ChartJS(ctx, {
      type: "bar",
      data,
      options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [alerts]);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/alerts/`);
      setAlerts(response.data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  const countSeverity = () => {
    const severityCount = {
      low: 0,
      medium: 0,
      high: 0,
    };

    alerts.forEach((alert) => {
      severityCount[alert.severity]++;
    });

    return severityCount;
  };

  const generateData = (severityCount) => {
    return {
      labels: ["Low", "Medium", "High"],
      datasets: [
        {
          label: "Alert Severity",
          data: [severityCount.low, severityCount.medium, severityCount.high],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
          ],
        },
      ],
    };
  };

  const generateOptions = () => {
    return {
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          type: "category",
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label;
              const value = context.raw;
              return `${label}: ${value}`;
            },
          },
        },
      },
    };
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/alerts/`, formData);
      if (response.status === 201) {
        toast.success("Alert created successfully!");
        handleCloseModal();
      }
    } catch (error) {
      console.error("Error creating alert:", error);
      toast.error("Failed to create alert!");
    }
  };

  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = alerts.slice(indexOfFirstAlert, indexOfLastAlert);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col p-4 md:p-8 w-full md:w-3/4">
      <div className="relative">
        {currentUser.user.role === "admin" && (
          <Button
            className="absolute top-0 right-0 mt-4 mb-5 mr-4"
            onClick={handleOpenModal}
          >
            Add Alert
          </Button>
        )}
      </div>
      <h1 className="text-2xl font-semibold mb-4">Alerts</h1>
      <div
        className="chart-container mx-auto w-full sm:w-2/3 md:w-1/2 lg:w-1/3"
        style={{ height: "300px" }}
      >
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="overflow-x-auto mt-5">
        <Table hoverable className="min-w-full shadow-md">
          <Table.Head>
            <Table.HeadCell>Type</Table.HeadCell>
            <Table.HeadCell>Message</Table.HeadCell>
            <Table.HeadCell>Location</Table.HeadCell>
            <Table.HeadCell>Severity</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Time</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {currentAlerts.map((alert) => (
              <Table.Row key={alert.id} className="hover:bg-gray-100">
                <Table.Cell className="font-bold">{alert.type}</Table.Cell>
                <Table.Cell>{alert.message}</Table.Cell>
                <Table.Cell>{alert.location}</Table.Cell>
                <Table.Cell>{alert.severity.toUpperCase()}</Table.Cell>
                <Table.Cell>{alert.status}</Table.Cell>
                <Table.Cell>{formatTimestamp(alert.timestamp)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div className="flex justify-center mt-5">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(alerts.length / alertsPerPage)}
          onPageChange={onPageChange}
        />
      </div>

      <Modal show={isModalOpen} onClose={handleCloseModal} size="md">
        <form onSubmit={handleSubmit}>
          <Modal.Header>Add Alert</Modal.Header>
          <Modal.Body>
            <div className="mb-2">
              <Label htmlFor="type" value="Type" />
              <TextInput
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <Label htmlFor="message" value="Message" />
              <TextInput
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <Label htmlFor="location" value="Location" />
              <TextInput
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <Label htmlFor="severity" value="Severity" />
              <Select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </div>
            <div className="mb-2">
              <Label htmlFor="status" value="Status" />
              <TextInput
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Submit</Button>
          </Modal.Footer>
        </form>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default AlertPage;
