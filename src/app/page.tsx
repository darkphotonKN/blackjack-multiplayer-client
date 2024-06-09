"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useCardManager from "../hooks/useCardManager";
import Card from "../components/Card";

import styles from "./page.module.css";

export default function Home() {
  const { deck, playersHand, dealerHand } = useCardManager();

  console.log("deck:", deck);
  console.log("dealersCard:", dealerHand);

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

    // if there are cards still remaining we draw the second one
    // clean up
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h3>Blackjack</h3>

      {/* Dealers Hand */}
      <div className={styles.playerTitle}>DEALER</div>
      <div className={styles.cardArea}>
        {dealerHand && dealerHand.map((card) => <Card card={card} />)}
      </div>

      {/* players hand */}
      <div className={styles.playerTitle}>PLAYER</div>
      <div className={styles.cardArea}>
        {dealerHand && dealerHand.map((card) => <Card card={card} />)}
      </div>
    </div>
  );
}
