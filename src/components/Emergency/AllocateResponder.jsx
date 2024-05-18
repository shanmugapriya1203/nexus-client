import React, { useState, useEffect } from "react";
import { Button, Table } from "flowbite-react";
import DashSidebar from "../DashSidebar";
import { BASE_URL } from "../../api/apiservice";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

const AllocateResponder = () => {
  const [responders, setResponders] = useState([]);
  const [incidentId, setIncidentId] = useState(null);

  useEffect(() => {
    fetchData();
    const url = window.location.href;
    const idIndex = url.lastIndexOf("/");
    const extractedId = idIndex !== -1 ? url.substring(idIndex + 1) : null;
    setIncidentId(extractedId);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/incident/responders`);
      const data = await response.json();
      setResponders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAllocate = async (responderId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/incident/${incidentId}/assign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ responderId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to allocate incident to responder");
      }

      // Update responders state to mark the allocated responder
      setResponders((prevResponders) =>
        prevResponders.map((responder) =>
          responder._id === responderId
            ? { ...responder, allocated: true }
            : responder
        )
      );

      toast.success("Incident assigned to responder successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to allocate incident to responder");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="">
        <DashSidebar />
      </div>
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-semibold mb-4">Allocate Responder</h1>
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Full name</Table.HeadCell>
            <Table.HeadCell>Area</Table.HeadCell>
            <Table.HeadCell>City</Table.HeadCell>
            <Table.HeadCell>Profession</Table.HeadCell>
            <Table.HeadCell>Availability</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {responders.map((responder) => (
              <Table.Row key={responder._id} className="hover:bg-gray-100">
                <Table.Cell className="bg-gray-50 dark:bg-gray-700 font-bold">
                  {responder.user.fullName.toUpperCase()}
                </Table.Cell>
                <Table.Cell>{responder.user.area}</Table.Cell>
                <Table.Cell>{responder.user.city}</Table.Cell>
                <Table.Cell>{responder.responderType}</Table.Cell>
                <Table.Cell>
                  {responder.availability ? (
                    <AiOutlineCheck className="text-green-500" />
                  ) : (
                    <AiOutlineClose className="text-red-500" />
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    disabled={responder.allocated}
                    onClick={() => handleAllocate(responder._id)}
                  >
                    {responder.allocated ? "Allocated" : "Allocate"}
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default AllocateResponder;
