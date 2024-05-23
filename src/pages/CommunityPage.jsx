import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../api/apiservice";
import { Button, Modal, Label, TextInput } from "flowbite-react";
import ThreadCard from "../components/community/ThreadCard";
import Pagination from "../components/community/Pagination";

const CommunityPage = () => {
  const [threads, setThreads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newThread, setNewThread] = useState({ title: "", content: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [threadsPerPage] = useState(3);

  const fetchThreads = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/threads/`);
      if (response.ok) {
        const data = await response.json();
        setThreads(data);
      } else {
        throw new Error("Failed to fetch threads");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewThread((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/threads/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newThread),
      });

      if (response.ok) {
        const newThreadData = await response.json();
        setThreads((prevThreads) => [newThreadData, ...prevThreads]);
        setShowModal(false);
        setNewThread({ title: "", content: "" });
        fetchThreads(); // Fetch threads again to refresh the list
      } else {
        throw new Error("Failed to create new thread");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Pagination logic
  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = threads.slice(indexOfFirstThread, indexOfLastThread);
  const totalPages = Math.ceil(threads.length / threadsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div>
        <div className="flex flex-col w-full p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-500 mb-5">
              Community Hub
            </h1>
            <Button color="success" onClick={() => setShowModal(true)}>
              Ask Yours
            </Button>
          </div>
          {currentThreads.map((thread) => (
            <ThreadCard
              key={thread._id}
              thread={thread}
              fetchThreads={fetchThreads}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={nextPage}
            onPrevPage={prevPage}
          />
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Ask Your Question</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" value="Title" />
              <TextInput
                id="title"
                name="title"
                value={newThread.title}
                onChange={handleInputChange}
                placeholder="Enter title"
                required
              />
            </div>
            <div>
              <Label htmlFor="content" value="Content" />
              <TextInput
                id="content"
                name="content"
                value={newThread.content}
                onChange={handleInputChange}
                placeholder="Enter content"
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleFormSubmit}>Submit</Button>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommunityPage;
