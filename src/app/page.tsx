"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useCardManager from "../hooks/useCardManager";
import Card from "../components/Card";

import styles from "./page.module.css";
import Image from "next/image";
import { romanNumeralMapping } from "../data/mapping";

export default function Home() {
  const { deck, playersHand, dealerHand } = useCardManager();

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
      <h3>BLACKJACK</h3>
      <Image
        src={"/images/complex-deco.png"}
        alt="title-deco"
        width={50}
        height="30"
      />

      {/* Dealers Hand */}
      <div className={styles.titleWrapper}>
        <Image
          src={"/images/star-deco.png"}
          alt="title-deco"
          width={40}
          height="20"
        />
        <div className={styles.playerTitle}>DEALER</div>
        <Image
          src={"/images/star-deco.png"}
          alt="title-deco"
          width={40}
          height="20"
        />
      </div>

      <div className={styles.cardArea}>
        {dealerHand && dealerHand.map((card) => <Card card={card} />)}
      </div>

      {/* players hand */}
      <div className={styles.playerArea}>
        {playersHand?.map((playerHand, index) => (
          <div>
            <div className={styles.titleWrapper}>
              <Image
                src={"/images/simple-deco.png"}
                alt="title-deco"
                width={40}
                height="20"
              />
              <div className={styles.playerTitle}>
                PLAYER{" "}
                {
                  romanNumeralMapping[
                    (index + 1).toString() as keyof typeof romanNumeralMapping
                  ]
                }
              </div>
              <Image
                src={"/images/simple-deco.png"}
                alt="title-deco"
                width={40}
                height="20"
              />
            </div>
            <div className={styles.cardArea}>
              {playerHand && playerHand.map((card) => <Card card={card} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
