import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { BASE_URL } from "../api/apiservice";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(BASE_URL);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    setSocket(newSocket);

    // Clean up socket connection on unmount
    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
