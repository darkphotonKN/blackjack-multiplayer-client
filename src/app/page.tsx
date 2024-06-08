"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Deck, initalizeDeck, shuffleDeck } from "./game/cards";

export default function Home() {
  // initialize deck
  const [deck, setDeck] = useState<Deck>(initalizeDeck());

  console.log("deck:", deck);

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

    // shuffle initial deck
    setDeck((prevDeck) => shuffleDeck(prevDeck));

    // clean up
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h3>Blackjack</h3>
    </div>
  );
}
