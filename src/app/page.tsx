"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {
  useEffect(() => {
    // connect to websocket
    const socket = io("http://localhost:5050");

    socket.on("connect", () => {
      console.log("Connected to socket.io server.");
      socket.send("Connecting to Server.");
    });

    socket.on("message", (message) => {
      console.log(`Message from server: ${message}`);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.io server.");
    });

    // clean up
    return () => {
      socket.close();
    };
  }, []);

  return <div>test</div>;
}
